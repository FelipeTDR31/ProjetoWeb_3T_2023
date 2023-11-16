'use client'

import '../styles/globals.scss'
import React, { useEffect } from "react"
import { useRouter } from 'next/navigation'
import ItemEdit from './items/itemEdit'

export default function AdminPage({username, email} : {username: string, email: string}) {
    type itemInfo = {
        id : number,
        title : string,
        image : string
    }

    const [rankItems, setRankItems] = React.useState([])
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

        useEffect(() => {
            fetch("http://localhost:4000/getAllItems", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => setItems(data))

            if (editItems.length != numberOfItems) {
                let num = items.length-1
                console.log(numberOfItems)
                let component = <ItemEdit id={items[num].id} title={items[num].title} image={items[num].image} />
                let array = editItems
                array.push(component)
                setEditItems(array)
                setNumberOfItems(editItems.length)
            }else if ( items.length != numberOfItems && editItems.length == numberOfItems) {
                for (let i = 0; i < (items.length); i++) {
                    const item = items[i];
                    console.log(item)
                    let component = <ItemEdit id={item.id} title={item.title} image={item.image} />
                    let array = editItems
                    array.push(component)
                    setEditItems(array)
                }
                

                setNumberOfItems(editItems.length)

            }
        })

    async function createItem() {
        const token = getCookie("token")
        let itemImps : NodeListOf<HTMLInputElement> = document.querySelectorAll(".itemImp")
        let itemTitle = itemImps[0].value
        let itemImage = itemImps[1].value

        console.log(itemTitle)
        console.log(itemImage)
        
        fetch("http://localhost:4000/createItem", {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify({title : itemTitle, image : itemImage})
            })
            .then(() => {
                let newNumber = numberOfItems + 1
                setNumberOfItems(newNumber)
            })
        
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
                    <button type="submit" onClick={logOut}>Sair</button>
                </div>
            </nav>

            <section className="items">
                <form id='formTest' method='post' encType='multipart/form-data'>
                    <input className='itemImp' type="text" placeholder="Título do Item" name="title" id='title'  />
                    <input className='itemImp' type="text" placeholder="Link da imagem" name="image" id='image'  />
                    <button type="button" onClick={createItem}>Criar Item</button>
                </form>

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
            </section>

            <section className="ranking"></section>
        </main>
    )
}