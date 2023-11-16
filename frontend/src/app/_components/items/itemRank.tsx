'use client'

export default function ItemRank({id, title, image} : {id: number,title: string, image: string}) {
    return(
        <div>
            <button type="button" className="deleteItem">X</button>
            <img src={`../images/${image}`} alt={`${title}`} />
            <h4>{title} - <img className="" src="../images/edit.png" alt="edit" /></h4>
        </div>
    )
}