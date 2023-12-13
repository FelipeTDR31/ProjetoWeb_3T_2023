'use client'

import '../styles/globals.scss'
import React, { useEffect } from "react"
import { useRouter } from 'next/navigation'
import ItemEdit from './items/itemEdit'
import ItemRank from './items/itemRank'
import EditItemForm from './editItemForm'
import ReactDOM from 'react-dom'
import Image from 'next/image'
import changeImg from '../../../images/mudar.png'

export default function AdminPage({username, email} : {username: string, email: string}) {
    type itemInfo = {
        id : number,
        title : string,
        image : string
    }

    const [rankItems, setRankItems] = React.useState<React.ReactElement[]>([])
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
            console.log(numberOfItems)
            setEditItems(newEditItems)
            setRankItems(newRankItems)
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
            .then(data => {
                if (editItems.length != numberOfItems && data.items.length == numberOfItems) {
                    console.log("Adicionado")
                    let num = numberOfItems-1
                    let itemRating = data.ratings[num]
                    if (typeof itemRating != "number") {
                        itemRating = 0
                    }
                    const imageName = data.items[num].image.split("/")[1]
                    let component = <ItemEdit id={data.items[num].id} title={data.items[num].title} imageName={imageName} deleteItem={deleteItem} editItemForm={<EditItemForm itemId={data.items[num].id.toString()} itemTitle={data.items[num].title} editItemInfo={editItemInfo} />} />
                    let component2 = <ItemRank id={data.items[num].id} title={data.items[num].title} imageName={imageName} rating={itemRating} showRating={true} />
                    let array = editItems
                    let array2 = rankItems
                    array.push(component)
                    array2.push(component2)
                    setEditItems(array)
                    setRankItems(array2)
                    setNumberOfItems(editItems.length)
                }else if ( data.items.length != numberOfItems && (data.items.length)>(numberOfItems+1) && editItems.length == numberOfItems) {
                    console.log("LOOOP")
                    console.log(numberOfItems)
                    console.log("____________")
                    for (let i = 0; i < (data.items.length); i++) {
                        const item = data.items[i]
                        let itemRating = data.ratings[i]
                        if (typeof itemRating != "number") {
                            itemRating = 0
                        }
                        const imageName = item.image.split("/")[1]
                        let component = <ItemEdit id={item.id} title={item.title} imageName={imageName} deleteItem={deleteItem} editItemForm={<EditItemForm itemId={item.id.toString()} itemTitle={item.title} editItemInfo={editItemInfo} />} />
                        let component2 = <ItemRank id={item.id} title={item.title} imageName={imageName} rating={itemRating} showRating={true} />
                        let array = editItems
                        let array2 = rankItems
    
                        array.push(component)
                        array2.push(component2)
                        setEditItems(array)
                        setRankItems(array2)
                    }
                    console.log("Data.items.length: "+data.items.length)
                    setNumberOfItems(data.items.length)
                    console.log(numberOfItems)

                    const ascItems = rankItems
                    .sort((a, b) => b.props.rating - a.props.rating) // Sort items by rating (highest first)
                setRankItems(ascItems)
                }   
            })
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
                        setEditItems([...editItems, <ItemEdit id={data.id} title={data.title} imageName={data.image.split("/")[1]} deleteItem={deleteItem} editItemForm={<EditItemForm itemId={data.id} itemTitle={data.title} editItemInfo={editItemInfo} />} />])
                        setRankItems([...rankItems, <ItemRank id={data.id} title={data.title} imageName={data.image.split("/")[1]} rating={0} showRating={true} />])
                        
                    }
                })
                
            }
        }
    }

    async function editItemInfo() {
        const token = getCookie("token")
        let editItemInputs : NodeListOf<HTMLInputElement> = document.querySelectorAll('.edit')
        let editForm : HTMLElement | null = document.querySelector(".editForm")

        if (editItemInputs![0].value!= "" && editItemInputs![1].value != "" && editItemInputs![1].value.includes('png') || editItemInputs![1].value.includes('jpeg') || editItemInputs![1].value.includes('jpg')) {

            if (editItemInputs![1].value.includes("data:") || editItemInputs![1].value.includes('https://') || editItemInputs![1].value.includes('http://')) {
                fetch("http://localhost:4000/editItem", {
                method : "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({id : Number(editForm!.id), title : editItemInputs![0].value, image : editItemInputs![1].value})
                })
                .then(res => res.json())
                .then(data => {
                    if (data.notAnItem) {
                        alert("Item não existe")
                    }else{
                        let itemIndex = 0
                        let updatedItem1 = <ItemEdit id={data.id} title={data.title} imageName={data.image.split("/")[1]} deleteItem={deleteItem} editItemForm={<EditItemForm itemId={data.id} itemTitle={data.title} editItemInfo={editItemInfo} />} />
                        let updatedItem2 = <ItemRank id={data.id} title={data.title} imageName={data.image.split("/")[1]} rating={0} showRating={true} />
                        for (let i = 0; i < editItems.length; i++) {
                            const editItem = editItems[i];
                            if (editItem.props.id==updatedItem1.props.id) {
                                itemIndex = editItems.indexOf(editItem)
                            }
                        }

                        let newArray1 = [...editItems]
                        let newArray2 = [...rankItems]
                        newArray1[itemIndex] = updatedItem1
                        newArray2[itemIndex] = updatedItem2

                        setEditItems(newArray1)
                        setRankItems(newArray2)
                    }

                    ReactDOM.unmountComponentAtNode(document.querySelector("#editFormContainer")!)
                })
            }
        }
    }

    function changeOrder() {
        let containers = document.querySelector(".rankItems")
            if (containers!.classList.contains("invert")) {
                containers!.classList.remove("invert")
            }else{
                containers!.classList.add("invert")
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

                    <span id='editFormContainer'></span>
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
            </section>
        </main>
    )
}