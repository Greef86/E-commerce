const port = process.env.PORT || 4000
const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer")
const cors = require("cors")
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const cloudinary = require("./utils/cloudinary")
const app = express()

app.use(express.json())
app.use(cors({
    origin: ["https://greeftechnologies.netlify.app"]
}))

//Database Connection With MongoDB
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
				images: [product.image],
                metadata: {
                    size: product.size, 
                },
			},
			unit_amount: Math.round(product.new_price*product.count*100)
		},
		quantity: product.count
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
    //return res.status(200).json({success: true, image_url: "ImageUrl", image_id: "ImageId"})
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

    console.log("Removed")
    res.json({
        success: true,
        name: req.body.name
    })
})

//API For Getting All Products
app.get("/allproducts", async (req, res) => {
    let products = await Product.find({})
    console.log(products)
    return res.status(200).json(products)
})

//Creating new endpoint for new collection's data
app.get("/newcollection", async (req, res) => {
    let products = await Product.find({})
    let newcollection = products.slice(1).slice(-8)
    res.send(newcollection)
})

//Creating endpoint for adding data in cart
app.post("/addtocart", async (req, res) => {
    const product = await Product.findOne({id: req.body.itemId})
    const productWithSize = {...product.toObject(), size: req.body.size}
	return res.status(200).json(productWithSize)
})

app.listen(port, (error) => {
    if(!error){
        console.log("Server running on port " + port)
    }else{
        console.log("Error: " + error)
    }
})
