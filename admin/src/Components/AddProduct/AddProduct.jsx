import React, { useState } from 'react'
import "./AddProduct.css"
import { MdCloudUpload, MdUpload } from "react-icons/md"

const AddProduct = () => {

	const [image, setImage] = useState(false)
	const [loading, setLoading] = useState(false)
	const [errorState, setErrorState] = useState(null)
	const [successState, setSuccessState] = useState(null)

	const [productDetails, setProductDetails] = useState({
		name: "",
		image: "",
		imageID: "",
		category: "men",
		new_price: "",
		old_price: "",
		description: ""
	})

	const imageHandler = (event) => {
		setImage(event.target.files[0])
	}

	const changeHandler = (event) => {
		setProductDetails({ ...productDetails, [event.target.name]: event.target.value })
	}

	const addProductHandler = async () => {
		if (!image) {
			setSuccessState(null)
			return setErrorState("All fields except (Product Description) are required!")
		}
		setLoading(true)
		let responseData
		let product = productDetails

		let formData = new FormData()
		formData.append("product", image)

		await fetch("https://onlinestore-backend-hjyg.onrender.com/upload", {
			method: "POST",
			headers: {
				Accept: "application/json",
			},
			body: formData,
		}).then((response) => response.json()).then((data) => { responseData = data })

		if (responseData.success) {
			product.image = responseData.image_url
			product.imageID = responseData.image_id
			await fetch("https://onlinestore-backend-hjyg.onrender.com/addproduct", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(product),
			}).then((response) => response.json()).then((data) => {
				setImage(false)
				setProductDetails({ ...productDetails, name: "", new_price: "", old_price: "", description: "" })
				setLoading(false)
				if (data.success) {
					setErrorState(null)
					setSuccessState("Product Added Successfully!")
					setTimeout(() => {
						setSuccessState(null)
					}, 10000)
				} else {
					setErrorState(data.errors)
				}
			})
		}
	}

	return (
		<div className='add-product'>
			<div className="addproduct-itemfield">
				<input maxLength="40" value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder='Product Title' className='product-title' />
			</div>
			<div className="addproduct-itemfield">
				<textarea maxLength="200" rows={4} value={productDetails.description} onChange={changeHandler} type="text" name="description" placeholder='Product Description (Optional)' className='description' />
			</div>
			<div className="addproduct-price">
				<input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Normal Price' />
				<input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Offer Price' />
			</div>
			<div className="addproduct-itemfield">
				<select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
					<option value="men">Men</option>
					<option value="women">Women</option>
					<option value="kid">Kids</option>
				</select>
			</div>
			<div className="file-upload">
				<label htmlFor="file-input">
					{image ? <img className='add-product-image' src={URL.createObjectURL(image)} alt='' /> : <MdCloudUpload className='file-upload-icon' />}
				</label>
				<input accept='.jpeg, .jpg, .png, .PNG' onChange={imageHandler} type="file" name="image" id="file-input" className='uploadfile' hidden />
				<span className='important'>{`IMPORTANT!!! picture width must be < or = picture height, square to door shaped pictures (1:1, 2:3, 3:4, 4:5 etc )`}</span>
			</div>
			{errorState && <small style={{ color: "red", backgroundColor: "white" }}>{errorState}</small>}
			{successState && <small style={{ color: "green", backgroundColor: "yellow" }}>{successState}</small>}
			<button onClick={() => { addProductHandler() }} className='add-product-btn'>{loading ? "Loading Product..." : "Add Product"}</button>
		</div>
	)
}

export default AddProduct
