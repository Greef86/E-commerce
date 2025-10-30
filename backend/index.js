const port = process.env.PORT || 4000
const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")
const cors = require("cors")
const { type } = require("os")
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const cloudinary = require("./utils/cloudinary")
const bcrypt = require("bcryptjs")
const app = express()

app.use(express.json())
app.use(cors())

//Database Connection With MongoDB
//"mongodb+srv://greeflesley7:860214Ml@cluster0.ekwcero.mongodb.net/e-commerce"
mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING)

//API Creation
app.get("/", (req, res) => {
    return res.json("Express App is running!")
})

//Checkout Gateway With Stripe
app.post("/create-checkout-session", async(req, res) => {
	const {products} = req.body
	const lineItems = products.map((product) => ({
		price_data: {
			currency: "zar",
			product_data: {
				name: product.name,
				images: [product.image]
			},
			unit_amount: Math.round(product.price*100)
		},
		quantity: product.quantity
	}))
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		shipping_address_collection: {
			allowed_countries: ['US', 'ZA'],
		  },
		line_items: lineItems,
		phone_number_collection: {enabled: true},
		mode: "payment",
		success_url: "https://greeftechnologies.netlify.app/payment-successful",
		cancel_url: "https://greeftechnologies.netlify.app/payment-cancel"
	})
	console.log(session)
	res.json({id: session.id})
})

//Image Storage Engine
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        // return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
		return cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})

//Creating Upload Endpoint For Images
// app.use("/images", express.static("upload/images"))

app.post("/upload", upload.single("product"), (req, res) => {

	cloudinary.uploader.upload(req.file.path, (err, result) => {
		if(err){
			console.log(err)
			return res.status(500).json({success: false, errors: "Error"})
		}else{
			console.log(result)
			return res.status(200).json({success: true, image_url: result.secure_url, image_id: result.public_id})
		}
	})
})

//Schema For Creating Products
const Product = mongoose.model("Product", {
    id: {type: Number, required: true},
    name: {type: String, required: true},
    image: {type: String, required: true},
	imageID: {type: String, required: true},
    category: {type: String, required: true},
    new_price: {type: Number, required: true},
    old_price: {type: Number, required: true},
	description: {type: String, default: ""},
    date: {type: Date, default: Date.now},
    available: {type: Boolean, default: true},
})
  
app.post("/addproduct", async (req, res) => {
	if(!req.body.name || !req.body.image || !req.body.imageID || !req.body.category || !req.body.new_price || !req.body.old_price){
		return res.status(400).json({success: false, errors: "All fields except (Product Description) are required!"})
	}
    let products = await Product.find({})
    let id
    if(products.length>0){
        let last_product_array = products.slice(-1)
        let last_product = last_product_array[0]
        id = last_product.id + 1
    }else{
        id = 1
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
		imageID: req.body.imageID,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
		description: req.body.description
    })
    console.log(product)
    await product.save()
    console.log("Saved!")
    res.json({
        success: true,
        name: req.body.name,
    })
})

//API For Deleting Products
app.post("/removeproduct", async (req, res) => {
    const deletedDocument = await Product.findOneAndDelete({id: req.body.id})

	const imageUrl = deletedDocument.imageID
	await cloudinary.uploader.destroy(imageUrl)
	
	let userData = await Users.find()
	for(let i = 0; i < userData.length; i++){
		while(userData[i].cartData[req.body.id].quantity !== 0){
			if(userData[i].cartData[req.body.id].quantity > 0)
			userData[i].cartData[req.body.id].quantity -= 1
			userData[i].cartData[req.body.id].size.pop() 
			await Users.findOneAndUpdate({_id: userData[i].id}, {cartData: userData[i].cartData})
		}
	}

    console.log("Removed")
    res.json({
        success: true,
        name: req.body.name
    })
})

//API For Getting All Products
app.get("/allproducts", async (req, res) => {
    let products = await Product.find({})
    return res.status(200).json(products)
})

//Schema creation for user model
const Users = mongoose.model("Users", {
    name: {type: String},
    email: {type: String, unique: true},
    password: {type: String},
	isVerified: {type: Boolean, default: false},
	verificationCode: {type: String},
    cartData: {type: Object},
    date: {type: Date, default: Date.now}
})

//Creating endpoint for registering the user
app.post("/signup", async (req, res) => {
	if(!req.body.username || !req.body.email || !req.body.password){
		return res.status(400).json({success: false, errors: "All fields are required!"})
	}
    let check = await Users.findOne({email: req.body.email})
    if(check){
        return res.status(400).json({success: false, errors: "Existing user found with same email address!"})
    }
    let cart = {}
    for(let i = 0; i < 300; i++){
        cart[i] = {quantity: 0, size: []}
    }
	const salt = await bcrypt.genSalt()
	const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: hashedPassword,
		verificationCode: verificationCode,
        cartData: cart,
    })
    await user.save()
    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, "secret_ecom")
    res.json({success: true, token})
})

app.delete("/destroy-user", async (req, res) => {
	try {
		console.log(req.body.email)
		await Users.findOneAndDelete({email: req.body.email})
		return res.status(200).json("User Deleted Successfully")
	} catch (error) {
		return res.status(500).json({success: false, errors: error.message})
	}
})

app.delete("/delete-useless-data", async(req, res) => {
	try {
		await Users.deleteMany({isVerified: false})
		return res.status(200).json("Useless data is deleted")
	} catch (error) {
		return res.status(500).json({success: false, errors: error.message})
	}
})

//Creating endpoint for user login
app.post("/login", async (req, res) => {
	if(!req.body.email || !req.body.password){
		return res.status(400).json({success: false, errors: "All fields are required!"})
	}
    let user = await Users.findOne({email: req.body.email, isVerified: true}) 
	if(!user){return res.status(400).json({success: false, errors: "Incorrect email or password!"})}
    if(user){
        const passwordCompare = await bcrypt.compare(req.body.password, user.password) //req.body.password === user.password
        if(passwordCompare){
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, "secret_ecom")
            res.json({success: true, token})
        }else{
            res.status(400).json({success: false, errors: "Incorrect password!"})
        }
    }else{
        res.status(400).json({success: false, errors: "Incorrect email address!"})
    }
})

//Creating new endpoint for new collection's data
app.get("/newcollection", async (req, res) => {
    let products = await Product.find({})
    let newcollection = products.slice(1).slice(-8)
    // console.log("New Collection Fetched!")
    res.send(newcollection)
})

//Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header("auth-token")
    if(!token){
        res.status(401).send({errors: "Please authenticate using valid token!"})
    }else{
        try {
            const data = jwt.verify(token, "secret_ecom")
            req.user = data.user
            next()
        } catch (error) {
            res.status(401).send({errors: "Please authenticate using valid token!"})
        }
    }
}

//Creating endpoint for adding data in cart
app.post("/addtocart", fetchUser, async (req, res) => {
    console.log("Added", req.body.itemId)
    let userData = await Users.findOne({_id: req.user.id})
    userData.cartData[req.body.itemId].quantity += 1
	userData.cartData[req.body.itemId].size.push(req.body.size)  
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData})
	return res.status(200).json("added")
})

//Creating endpoint to remove product from cart data
app.post("/removefromcart", fetchUser, async (req, res) => {
    console.log("Removed", req.body.itemId)
    let userData = await Users.findOne({_id: req.user.id})
    if(userData.cartData[req.body.itemId].quantity > 0)
    userData.cartData[req.body.itemId].quantity -= 1
	userData.cartData[req.body.itemId].size.pop() 
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData})
	return res.status(200).json("removed")
})

//Creating endpoint to clear cart
app.post("/clearcart", fetchUser, async (req, res) => {
	let userData = await Users.findOne({_id: req.user.id})
	for(let i = 0; i < req.body.cartitems.length; i++){
		userData.cartData[req.body.cartitems[i].productId].quantity = 0
		userData.cartData[req.body.cartitems[i].productId].size = []
	}
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData})
	return res.status(200).json("cart cleared")
})

//Creating endpoint to get cart data
app.post("/getcart", fetchUser, async (req, res) => {
    console.log("GetCart")
    let userData = await Users.findOne({_id: req.user.id, isVerified: true})
	if(!userData){
		return res.status(404).json({success: false, errors: "No User Found"})
	}else{
		return res.status(200).json(userData.cartData)
	}
})

app.listen(port, (error) => {
    if(!error){
        console.log("Server running on port " + port)
    }else{
        console.log("Error: " + error)
    }
})
