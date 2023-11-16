'use client'

import Image from 'next/image'
import editImage from '../../images/editar.png'

export default function ItemEdit({id, title, image} : {id: number,title: string, image: string}) {
    return(
        <>
            <button type="button" className="deleteItem">X</button>
            <Image src={image} alt={title} width={100} height={100} />
            <h4>{title} - <Image className="" src={editImage} alt="edit" width={20} height={20} /></h4>
        </>
    )
}