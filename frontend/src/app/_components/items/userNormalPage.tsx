'use client'

import React, { useEffect } from 'react'
import ItemRank from './itemRank'

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

    let i = 0
    useEffect(() => {
        if (i === 0) {
            fetch("http://localhost:4000/getAllItems", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => setItems(data.items))
            .then(() => {
                if ( items.length != numberOfItems && (items.length)>(numberOfItems+1) && rankItems.length == numberOfItems) {
                    console.log("LOOOP")
                    console.log(items.length)
                    console.log(numberOfItems)
                    console.log("____________")
                    for (let i = 0; i < (items.length); i++) {
                        const item = items[i];
                        const imageName = item.image.split("/")[1]
                        console.log(item)
                        let component = <ItemRank id={item.id} title={item.title} imageName={imageName} rating={0} />
                        let array = rankItems
                        array.push(component)
                        setRankItems(array)
                    }
                    setNumberOfItems(items.length)

                }
            })


        }
    })

    return (
        <section className='classifiedItems'>
            <div className="ranking classifiedContainer">
                    <h1>itens mais queridos</h1>
                    <div className='rankItems classified'>
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

            <div className="ranking">
                    <h1>Ranking dos Itens</h1>
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

                    <button className='voteBtn' type="button" onClick={changePage}>IR VOTAR</button>
                </div>
        </section>
    )
}