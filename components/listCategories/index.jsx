'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import { capitalizeWords } from '@/lib/formatText';

export default function ListCategories({ categories }) {
  const router = useRouter();
  const MAX_CATEGORIES = 10;
  const shouldShowViewMore = categories.length > MAX_CATEGORIES;
  const visibleCategories = categories.slice(0, MAX_CATEGORIES);

  const handleCategoryClick = (categoryId) => {
    router.push(`/products?category=${categoryId}`);
  };

  return (
    <section className={styles.categoriesHeader}>
      <ul className={styles.categoriesList}>
        {visibleCategories.map((category) => (
          <li key={category.id}>
            <Link href={`/products?category=${category.id}`}>
              <span>{capitalizeWords(category.nome)}</span>
            </Link>
          </li>
        ))}
        {shouldShowViewMore && (
          <li>
            <Link href="/products" className={styles.viewMore}>
              <span>Ver Mais</span>
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
}
