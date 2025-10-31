import React, { useContext, useState } from 'react'
import "./ProductDisplay.css"
import { FaStar, FaRegStar } from 'react-icons/fa'
import { ShopContext } from '../../Context/ShopContext'
import { Link } from 'react-router-dom'

const ProductDisplay = (props) => {

	const { product } = props
	const { addToCart } = useContext(ShopContext)
	const [size, setSize] = useState("")
	const [errorState, setErrorState] = useState(null)
	const [successState, setSuccessState] = useState(null)

	const addProduct = (productId, productSize) => {
		if (productSize === "") {
			setSuccessState(null)
			setErrorState("Size not selected, Please select size!!!")
		} else {
			setErrorState(null)
			addToCart(productId, productSize)
			setSuccessState("One product successfully added to cart!")
			setTimeout(() => {
				setSuccessState(null)
			}, 10000)
		}
	}

	const addClass = (size) => {
		const small_btn = document.getElementById("small")
		const medium_btn = document.getElementById("medium")
		const large_btn = document.getElementById("large")
		const xlarge_btn = document.getElementById("x-large")

		if (size === "small") {
			medium_btn.classList.remove("smallBtnActive")
			large_btn.classList.remove("smallBtnActive")
			xlarge_btn.classList.remove("smallBtnActive")
			small_btn.classList.add("smallBtnActive")
		}
		if (size === "medium") {
			small_btn.classList.remove("smallBtnActive")
			large_btn.classList.remove("smallBtnActive")
			xlarge_btn.classList.remove("smallBtnActive")
			medium_btn.classList.add("smallBtnActive")
		}
		if (size === "large") {
			medium_btn.classList.remove("smallBtnActive")
			xlarge_btn.classList.remove("smallBtnActive")
			small_btn.classList.remove("smallBtnActive")
			large_btn.classList.add("smallBtnActive")
		}
		if (size === "x-large") {
			large_btn.classList.remove("smallBtnActive")
			small_btn.classList.remove("smallBtnActive")
			medium_btn.classList.remove("smallBtnActive")
			xlarge_btn.classList.add("smallBtnActive")
		}
	}

	try {
		return (
			<div className='productdisplay'>
				<div className="productDisplay-left">
					<div className="productDisplay-img-list">
						<img src={product.image} alt="" />
						<img src={product.image} alt="" />
						<img src={product.image} alt="" />
						<img src={product.image} alt="" />
					</div>
					<div className="productDisplay-img">
						<img className='productdisplay-main-img' src={product.image} alt="" />
					</div>
				</div>
				<div className="productDisplay-right">
					<h2>{product.name}</h2>
					<div className="productdisplay-right-stars">
						<span><FaStar /></span>
						<span><FaStar /></span>
						<span><FaStar /></span>
						<span><FaStar /></span>
						<FaRegStar />
						<p>(259)</p>
					</div>
					<div className="productdisplay-right-prices">
						<div className="productdisplay-right-price-new">R {product.new_price}</div>
						<div className="productdisplay-right-price-old">R {product.old_price}</div>
					</div>
					<div className="productdisplay-right-description">{product.description}</div>
					<div className="productdisplay-right-size">
						<h2>Select Size</h2>
						<div className="productdisplay-right-sizes">
							<div id='small' className='size-btn' onClick={() => {
								addClass("small")
								setSize("S")
							}}>S</div>
							<div id='medium' className='size-btn' onClick={() => {
								addClass("medium")
								setSize("M")
							}}>M</div>
							<div id='large' className='size-btn' onClick={() => {
								addClass("large")
								setSize("L")
							}}>L</div>
							<div id='x-large' className='size-btn' onClick={() => {
								addClass("x-large")
								setSize("XL")
							}}>XL</div>
						</div>
					</div>
					{errorState && <p style={{ color: "red", backgroundColor: "white" }}>{errorState}</p>}
					{successState && <p style={{ color: "green", backgroundColor: "yellow" }}>{successState}</p>}
					<button onClick={() => addProduct(product.id, size)} className='addToCartBtn'>ADD TO CART</button>
					<p className='productdisplay-right-category'><span>Category : </span>{product.category}</p>
					<p className='productdisplay-right-category'><span>Tags : </span>Modern, Latest</p>
				</div>
			</div>
		)
	} catch (err) {
		<Link to="/" replace={true}></Link>
	}


}

export default ProductDisplay
