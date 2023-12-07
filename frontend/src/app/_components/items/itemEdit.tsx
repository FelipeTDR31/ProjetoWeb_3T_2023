'use client'

import Image from 'next/image'
import editImage from '../../images/editar.png'
import ReactDOM from 'react-dom';

const imageLoader = ({ src } : { src : string }) => {
    return `http://localhost:4000/uploads/${src}`;
  };

export default function ItemEdit({id, title, imageName, deleteItem, editItemForm} : {id: number, title: string, imageName : string, deleteItem: any, editItemForm: any}) {
    
    function openEdit() {
        let container = document.querySelector("#editFormContainer")
        if (container?.hasChildNodes()) {
            ReactDOM.unmountComponentAtNode(container)
            ReactDOM.render(editItemForm, container)
        }else{
            ReactDOM.render(editItemForm, container)
        }
    }

    return(
        <>
            <input type="button" className="deleteItem" id={id.toString()} name={title} value="X" onClick={deleteItem} />
            <Image loader={imageLoader} src={imageName} alt={title} width={100} height={100} />
            <h4>{title} - <Image src={editImage} alt="edit" width={20} height={20} style={{cursor: "pointer"}} onClick={openEdit} /></h4>
        </>
    )
}