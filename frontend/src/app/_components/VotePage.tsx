'use client'

import React, { useEffect } from 'react'
import ItemRank from './items/itemRank'

export default function VotePage({username, changePage} : {username : String, changePage : any}) {
    type itemInfo = {
        id : number,
        title : string,
        image : string
    }

    const [rankItems, setRankItems] = React.useState<React.ReactElement[]>([])
    const [items, setItems] = React.useState<itemInfo[]>([])
    const [numberOfItems, setNumberOfItems] = React.useState<number>(0)
    const [currentItemIndex, setCurrentItemIndex] = React.useState<number>(0)

    let i = 0
    useEffect(() => {
        if (i === 0) {
            fetch("http://localhost:4000/getVoteQuantity", {
                method : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username: username})
            })
            .then(res => res.json())
            .then(data => {
                if (data.length!=0 && data[0]._count.itemID>0 && data[0]._count.itemID<rankItems.length) {
                    let num = data[0]._count.itemID
                    setCurrentItemIndex(num)
                }else if (data.length!=0 && data[0]._count.itemID==rankItems.length) {
                    setCurrentItemIndex(data[0]._count.itemID)
                    
                }
            })

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
                    for (let i = 0; i < (items.length); i++) {
                        const item = items[i];
                        const imageName = item.image.split("/")[1]
                        let component = <ItemRank id={item.id} title={item.title} imageName={imageName} rating={0} showRating={false} />
                        let array = rankItems
                        array.push(component)
                        setRankItems(array)
                    }
                    setNumberOfItems(items.length)

                }
            })

            i = 1
        }
    })

    async function voting(e : React.FormEvent) {

        if (e.currentTarget.classList.contains("like")) {
            let itemId = e.currentTarget.id
            let type = "like"
            fetch("http://localhost:4000/voteItem", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username: username, itemID: itemId, type : type})
            })
            .then(() => {
                setCurrentItemIndex(currentItemIndex+1)
            })
        }else{
            let itemId = e.currentTarget.id
            let type = "dislike"
            fetch("http://localhost:4000/voteItem", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username: username, itemID: itemId, type : type})
            })
            .then(() => {
                setCurrentItemIndex(currentItemIndex+1)
            })
        }
    }

    return (
        <section className='voteItems'>
            <div className="ranking">
                    <h1>Votar em Itens</h1>
                    <div className='rankItems'>
                        {
                            rankItems.map((rankItem, key) => {
                                if (currentItemIndex == key) {
                                    return (
                                        <div key={key} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                            <div className='rankItemContainer'>
                                                {rankItem}
                                            </div>

                                            <div className='voteBtnsContainer'>
                                                <button type='button' className='like' id={rankItem.props.id.toString()} onClick={voting}>Like</button>
                                                <button type='button' className='dislike' id={rankItem.props.id.toString()} onClick={voting}>Dislike</button>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }

                        {
                            currentItemIndex>=rankItems.length ? <div><p style={{fontSize:"1.5rem", fontWeight: "bold", padding: "20px"}}>Todos os Itens Foram Votados</p></div> : null
                        }
                    </div>
                    <button className='voteBtn' type="button" onClick={changePage} style={{top:"40vh"}}>VOLTAR</button>
                </div>
        </section>
    )
}