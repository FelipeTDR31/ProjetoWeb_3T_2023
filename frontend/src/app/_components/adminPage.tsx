'use client'

import '../styles/globals.scss'
import React, { useEffect } from "react"
import { useRouter } from 'next/navigation'
import ItemEdit from './items/itemEdit'
import ItemRank from './items/itemRank'

export default function AdminPage({username, email} : {username: string, email: string}) {
    type itemInfo = {
        id : number,
        title : string,
        image : string
    }

    const [rankItems, setRankItems] = React.useState<React.ReactElement[]>([])
    const [items, setItems] = React.useState<itemInfo[]>([])
    const [editItems, setEditItems] = React.useState<React.ReactElement[]>([])
    const [numberOfItems, setNumberOfItems] = React.useState<number>(0)

    const router = useRouter()
    
    async function logOut() {
        document.cookie = `token=; Path=/; Secure; SameSite=Strict;Max-Age=-1;`
        router.push("/login")
    }

    function getCookie(cookieName: string){
        var cookiestring  = document.cookie;
        var cookiearray = cookiestring.split(';');
        for(var i =0 ; i < cookiearray.length ; ++i){ 
            if(cookiearray[i].trim().match('^'+cookieName+'=')){ 
                return cookiearray[i].replace(`${cookieName}=`,'').trim();
            }
        } return null;
    }

    async function deleteItem(e: React.FormEvent<HTMLInputElement>) {
        const token = getCookie("token")
        const itemID = Number(e.currentTarget.id)
        const itemTitle = e.currentTarget.name
        fetch("http://localhost:4000/deleteItem", {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify({id : itemID, title: itemTitle})
        })
        .then(res => res.json())
        .then(data => {
            const newEditItems = editItems.filter(item => item.props.title!=data.title)
            const newRankItems = rankItems.filter(itemRank => itemRank.props.title!=data.title)
            setEditItems(newEditItems)
            setRankItems(newRankItems)
            console.log(newEditItems)
            console.log(numberOfItems)
            let newNumberOfItems = newEditItems.length
            console.log(newNumberOfItems)
            setNumberOfItems(newNumberOfItems)
        })
    }

        useEffect(() => {
            fetch("http://localhost:4000/getAllItems", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => setItems(data))

            if (editItems.length != numberOfItems && items.length == numberOfItems) {
                let num = numberOfItems-1
                const imageName = items[num].image.split("/")[1]
                let component = <ItemEdit id={items[num].id} title={items[num].title} imageName={imageName} deleteItem={deleteItem} />
                let component2 = <ItemRank id={items[num].id} title={items[num].title} imageName={imageName} />
                let array = editItems
                let array2 = rankItems
                array.push(component)
                array2.push(component2)
                setEditItems(array)
                setRankItems(array2)
                setNumberOfItems(editItems.length)
            }else if ( items.length != numberOfItems && (items.length)>=(numberOfItems+1) && items.length && editItems.length == numberOfItems) {
                console.log("LOOOP")
                console.log(items.length)
                console.log(numberOfItems)
                console.log("____________")
                for (let i = 0; i < (items.length); i++) {
                    const item = items[i];
                    const imageName = item.image.split("/")[1]
                    console.log(item)
                    let component = <ItemEdit id={item.id} title={item.title} imageName={imageName} deleteItem={deleteItem} />
                    let component2 = <ItemRank id={item.id} title={item.title} imageName={imageName} />
                    let array = editItems
                    let array2 = rankItems

                    array.push(component)
                    array2.push(component2)
                    setEditItems(array)
                    setRankItems(array2)
                }
                

                setNumberOfItems(items.length)

            }
        })

    async function createItem() {
        const token = getCookie("token")
        let itemImps : NodeListOf<HTMLInputElement> = document.querySelectorAll(".itemImp")
        let itemTitle = itemImps[0].value
        let itemImage = itemImps[1].value
        
        if (itemImage != "" && itemTitle != "" && itemImage.includes('png') || itemImage.includes('jpeg') || itemImage.includes('jpg')) {

            if (itemImage.includes("data:") || itemImage.includes('https://') || itemImage.includes('http://')) {
                fetch("http://localhost:4000/createItem", {
                method : "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({title : itemTitle, image : itemImage})
                })
                .then((res) => res.json())
                .then((data) => {
                    if (data.exists) {
                        alert("Item já existe")
                    }else {
                        let newNumber = numberOfItems + 1
                        setNumberOfItems(newNumber)
                        setEditItems([...editItems, <ItemEdit id={data.id} title={data.title} imageName={data.image.split("/")[1]} deleteItem={deleteItem} />])
                        setRankItems([...rankItems, <ItemRank id={data.id} title={data.title} imageName={data.image.split("/")[1]} />])
                        
                    }
                })
                
            }
        }
    }

    

    return(
        <main>
            <nav className="globalNavigation">
                <h2>Rate Programming Languages</h2>
                <div className='userInfo'>
                    <section>
                        <span>{username.toUpperCase()}</span>
                        <span>{email}</span>
                    </section>
                    <button className='navBtns' type="submit" onClick={logOut}>Sair</button>
                </div>
            </nav>

            <section className='itemsContainer'>
                <div className="items">
                    <form id='formTest' method='post' encType='multipart/form-data'>
                        <input className='itemImp' type="text" placeholder="Título do Item" name="title" id='title'  />
                        <input className='itemImp' type="text" placeholder="Link da imagem" name="image" id='image'  />
                        <button type="button" onClick={createItem}>Criar Item</button>
                    </form>

                    <h2>Itens:</h2>
                    <div className='editableItems'>
                        {
                            editItems.map((editItem, key) => {

                                return (
                                    <div key={key} className='editItemContainer'>
                                        {editItem}
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
            </section>
        </main>
    )
}