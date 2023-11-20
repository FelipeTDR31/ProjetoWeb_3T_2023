'use client'

import Image from 'next/image'

const imageLoader = ({ src } : { src : string }) => {
    return `http://localhost:4000/uploads/${src}`;
  };



export default function ItemRank({id, title, imageName} : {id: number,title: string, imageName : string}) {
    return(
        <>
            <Image loader={imageLoader} src={imageName} alt={title} width={180} height={180} />
            <span>Ranking: 0</span>
        </>
    )
}