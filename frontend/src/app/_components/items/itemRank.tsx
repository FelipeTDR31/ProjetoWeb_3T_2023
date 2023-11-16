'use client'

import Image from 'next/image'


export default function ItemRank({id, title, image} : {id: number,title: string, image: string}) {
    return(
        <>
            <Image src={image} alt={title} width={180} height={180} />
            <span>Ranking: 0</span>
        </>
    )
}