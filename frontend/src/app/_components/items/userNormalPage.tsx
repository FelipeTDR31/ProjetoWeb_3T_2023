'use client'

import React, { useEffect } from 'react'
import ItemRank from './itemRank'
import changeImg from "../../../../images/mudar.png"
import Image from 'next/image'

export default function UserNormalPage({changePage} : {changePage : any}) {
    type itemInfo = {
        id : number,
        title : string,
        image : string
    }
    
    const [likedItems, setLikedItems] = React.useState<React.ReactElement[]>([])
    const [dislikedItems, setDislikedItems] = React.useState<React.ReactElement[]>([])
    const [rankItems, setRankItems] = React.useState<React.ReactElement[]>([])
    const [items, setItems] = React.useState<itemInfo[]>([])
    const [numberOfItems, setNumberOfItems] = React.useState<number>(0)

    useEffect(() => {
        fetch("http://localhost:4000/getAllItems", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setItems(data.items)
            if ( items.length != numberOfItems && (items.length)>(numberOfItems+1) && rankItems.length == numberOfItems) {
                for (let i = 0; i < (items.length); i++) {
                    const item = items[i];
                    let rating = data.ratings[i]
                    if (typeof rating != "number") {
                        rating = 0
                    }
                    const imageName = item.image.split("/")[1]
                    let component = <ItemRank id={item.id} title={item.title} imageName={imageName} rating={rating} showRating={true} />
                    let array = rankItems
                    array.push(component)
                    setRankItems(array)
                }
                setNumberOfItems(items.length)
                const topItems = rankItems
                    .sort((a, b) => b.props.rating - a.props.rating) // Sort items by rating (highest first)
                    .slice(0, 5); // Get the top 5 items
                setLikedItems(topItems)

                const bottomItems = rankItems
                    .sort((a, b) => a.props.rating - b.props.rating) // Sort items by rating (lowest first)
                    .slice(0, 5); // Get the bottom 5 items
                setDislikedItems(bottomItems)

                const ascItems = rankItems
                    .sort((a, b) => b.props.rating - a.props.rating) // Sort items by rating (highest first)
                setRankItems(ascItems)
            }
        })
    })

    function changeOrder() {
        let containers = document.querySelectorAll(".rankItems")
            if (containers[1].classList.contains("invert")) {
                containers[1].classList.remove("invert")
            }else{
                containers[1].classList.add("invert")
            }
    }

    return (
        <section className='classifiedItems'>
            <div className="ranking classifiedContainer">
                    <h1>itens mais queridos</h1>
                    <div className='rankItems classified'>
                        {
                            likedItems.map((rankItem, key) => {

                                return (
                                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                        <div key={key} className='rankItemContainer'>
                                            {rankItem}
                                        </div>
                                        <span>____________________________</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            <div className="ranking">
                    <h1>Ranking dos Itens - <Image onClick={changeOrder} src={changeImg} alt={'changeIMG'} width={30} height={30} style={{cursor:"pointer"}} /></h1>
                    <div className='rankItems'>
                        {
                            rankItems.map((rankItem, key) => {

                                return (
                                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                        <div key={key} className='rankItemContainer'>
                                            {rankItem}
                                        </div>
                                        <span>____________________________</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="ranking classifiedContainer">
                    <h1>Itens menos queridos</h1>
                    <div className='rankItems classified'>
                        {
                            dislikedItems.map((rankItem, key) => {

                                return (
                                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                        <div key={key} className='rankItemContainer'>
                                            {rankItem}
                                        </div>
                                        <span>____________________________</span>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <button className='voteBtn' type="button" onClick={changePage}>IR VOTAR</button>
                </div>
        </section>
    )
}