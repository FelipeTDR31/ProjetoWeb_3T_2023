'use client'

import Image from 'next/image'
import editImage from '../../images/editar.png'

const imageLoader = ({ src } : { src : string }) => {
    return `http://localhost:4000/uploads/${src}`;
  };

export default function ItemEdit({id, title, imageName} : {id: number, title: string, imageName : string}) {
    
    return(
        <>
            <button type="button" className="deleteItem">X</button>
            <Image loader={imageLoader} src={imageName} alt={title} width={100} height={100} />
            <h4>{title} - <Image src={editImage} alt="edit" width={20} height={20} style={{cursor: "pointer"}} /></h4>
        </>
    )
}