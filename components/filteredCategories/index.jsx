'use client';

import styles from './styles.module.css';
import { capitalizeWords } from '@/utils/formatText';

export default function FilteredCategories({ categories, selectedCategories, onCategoryChange }) {
  return (
    <div className={styles.categories}>
      <h2>Categorias</h2>
      {categories.map((category) => (
        <div key={category.id} className={styles.categoryItem}>
          <input
            type="checkbox"
            id={`category-${category.id}`}
            checked={selectedCategories.includes(category.id)}
            onChange={() => onCategoryChange(category.id)}
          />
          <label htmlFor={`category-${category.id}`}>{capitalizeWords(category.nome)}</label>
        </div>
      ))}
    </div>
  );
}
