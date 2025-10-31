import React, { useEffect, useState } from 'react'
import "./NewCollections.css"
import Item from "../Items/Item"
import { RotatingLines } from "react-loader-spinner"
import {backendUrl} from "../../Constants"
//I will remove this
// import new_collections from "../Assets/new_collections"

const NewCollections = () => {

	const [new_collections, setNew_collections] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => { 
		setLoading(true)
		fetch(`${backendUrl}/newcollection`).then((response) => response.json()).then((data) => {
			setNew_collections(data)
			setLoading(false)
		})
	}, [])

	return (
		<div className='new-collections'>
			<h1 className='main-header-text'>NEW COLLECTIONS</h1>
			<hr />
			{loading && <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
				<RotatingLines width='30' strokeColor='black' />
				<RotatingLines width='30' strokeColor='black' />
				<RotatingLines width='30' strokeColor='black' />
			</div>}
			<div className="collections">
				{new_collections.map((item, i) => {
					return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
				})}
			</div>
		</div>
	)
}

export default NewCollections
