'use client';

import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Link from "next/link";
import { FiArrowRight } from 'react-icons/fi';
import CarouselProducts from '../carouselProducts';

export default function ListProductsByCategory() {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products/categories');
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch products: ${response.status} ${errorText}`);
        }
        const data = await response.json();
        
        // Filtrar categorias sem produtos disponíveis
        const filteredData = Object.fromEntries(
          Object.entries(data).filter(([_, category]) => 
            category.produtos.some(product => product.quantidade > 0)
          )
        );
        
        setGroupedProducts(filteredData);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div className={styles.loading}>Carregando produtos...</div>;
  }

  if (Object.keys(groupedProducts).length === 0) {
    return <div className={styles.noProducts}>Nenhum produto disponível no momento.</div>;
  }

  return (
    <div>
      {Object.keys(groupedProducts).map((idCategoria) => {
        const categories = groupedProducts[idCategoria];
        return (
          <div key={idCategoria} className={styles.categorySection}>
            <div className={styles.categoriesTitle}>
              <h2>{categories.nomeCategoria}</h2>
              <Link className={styles.linkCategories} href={`/products?category=${idCategoria}`}>
                Ver todos
                <FiArrowRight />
              </Link>
            </div>
            <CarouselProducts products={categories.produtos} />
          </div>
        );
      })}
    </div>
  );
}