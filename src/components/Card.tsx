import type { ProcessedProperty } from '@prisma/client';
import Image from 'next/image';

type CardProps = Omit<ProcessedProperty, 'createdAt' | 'id' | 'propertyId'>;

export const Card = ({ name, price, featuredImage, address, bedroom, bathrooms, source, link }:  CardProps) => {
    console.log(featuredImage)
    return (
        <a target='_blank' rel="noreferrer" href={link}>
            {featuredImage && featuredImage !== 'N/A' && <Image src={featuredImage} className='object-cover w-full aspect-video' width="320" height="180" alt={name} />}
            <h3>{price ? `€${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : 'Price not found'}</h3>
            <p>{name}</p>
            {name !== address && <p>{address}</p>}
            <p>{bedroom}</p>
            <p>{bathrooms}</p>
            <p>{source}</p>
        </a>
    );
};