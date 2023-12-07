'use client'

import { useEffect } from 'react'
import '../styles/globals.scss'

export default function EditItemForm({itemId, itemTitle, editItemInfo} : {itemId : string, itemTitle : string, editItemInfo : any}) {

    return (
        <div className="editForm" id={itemId}>
            <form id='formTest' method='post' encType='multipart/form-data'>
                <input className='itemImp edit' type="text" placeholder="Título do Item" name="title" id='titleEdit' defaultValue={itemTitle} />
                <input className='itemImp edit' type="text" placeholder="Link da Nova Imagem" name="imageEdit" id='imageEdit'  />
                <button type="button" onClick={editItemInfo}>Criar Item</button>
            </form>
        </div>
    )
}