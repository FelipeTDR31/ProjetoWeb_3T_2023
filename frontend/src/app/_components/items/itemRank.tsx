'use client'

import Image from 'next/image'
import { useEffect } from 'react';

const imageLoader = ({ src } : { src : string }) => {
    return `http://localhost:4000/uploads/${src}`;
  };



export default function ItemRank({id, title, imageName, rating, showRating} : {id: number,title: string, imageName : string, rating: number, showRating: boolean}) {

    return(
        <>
            <Image loader={imageLoader} src={imageName} alt={title} width={180} height={180} />
            {
                showRating ? <span className='itemRating'>Ranking: {rating}</span> : <span></span>
            }
        </>
    )
}