import React, { useEffect, useState } from 'react'
import "./ListProduct.css"
import { MdDelete } from "react-icons/md"
import { RotatingLines } from "react-loader-spinner"

const ListProduct = () => {

	const [allProducts, setAllProducts] = useState([])
	const [loading, setLoading] = useState(false)

	const fetchInfo = async () => {
		setLoading(true)
		await fetch("http://localhost:4000/allproducts").then((response) => response.json()).then((data) => {
			setAllProducts(data)
			setLoading(false)
		})
	}

	useEffect(() => {
		fetchInfo()
	}, [])

	const removeProduct = async (id) => {
		await fetch("http://localhost:4000/removeproduct", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: id })
		})
		await fetchInfo()
	}

	return (
		<div className='list-product'>
			<h1>{`All Products, ${allProducts.length} items`}</h1>
			<div className="product-list-format-main table-head">
				<p><strong>Product</strong></p>
				<p><strong>Title</strong></p>
				<p><strong>Old Price</strong></p>
				<p><strong>New Price</strong></p>
				<p><strong>Category</strong></p>
				<p><strong>Remove</strong></p>
			</div>
			<hr />
			{loading && <RotatingLines width='30' strokeColor='white' />}
			<div className="products-list-all-products">
				{allProducts.map((product, index) => {

					if (index % 2 === 0) {
						return <div key={index} className="product-list-format-main listproduct-format odd">
							<div className="pic">
								<img src={product.image} alt="" className="listproduct-product-icon" />
							</div>
							<p className='product-name'>{product.name}</p>
							<p>R{product.old_price}</p>
							<p>R{product.new_price}</p>
							<p>{product.category}</p>
							<MdDelete onClick={() => removeProduct(product.id)} className='listproduct-remove-icon' />
						</div>
					} else {
						return <div key={index} className="product-list-format-main listproduct-format even">
							<div className="pic">
								<img src={product.image} alt="" className="listproduct-product-icon" />
							</div>
							<p className='product-name'>{product.name}</p>
							<p>R{product.old_price}</p>
							<p>R{product.new_price}</p>
							<p>{product.category}</p>
							<MdDelete onClick={() => removeProduct(product.id)} className='listproduct-remove-icon' />
						</div>
					}


				})}
			</div>
		</div>
	)
}

export default ListProduct
