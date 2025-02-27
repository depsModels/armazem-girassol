'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

import imgProprietarias from '@/public/assets/images/pictures/fotoProprietarias3x4.webp';
import imgArmazem from '@/public/assets/images/armazem.webp';
import imgBalcao3x4 from '@/public/assets/images/pictures/fotoBalcao3x4.webp';
import imgEstante1X1 from '@/public/assets/images/pictures/fotoEstante1x1.webp';
import imgBalcaoEntrada from '@/public/assets/images/pictures/fotoBalcaoEntrada1x1.webp';
import imgSunFlower from '@/public/assets/images/sunflowers.webp';

const images = [  
  { image: imgProprietarias, alt: 'Foto da proprietária Adriana Bayon Borges'},
  { image: imgArmazem, alt: 'Imagem do local armazemGirassol' }, 
  { image: imgBalcao3x4, alt: 'Foto da ampla dentro do armazem' },
  { image: imgEstante1X1, alt: 'Foto da prateleira do armazemGirassol' },
  { image: imgBalcaoEntrada, alt: 'Foto do balcão do local' },
  { image: imgSunFlower, alt: 'Imagem de girassois' },
];

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.slideshow}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          className={index === currentImageIndex ? styles.active : ''}
          alt={image.alt}
        />
      ))}
    </div>
  );
}
