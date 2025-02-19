'use client';

import { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './styles.module.css';
import PriceRangeSlider from '@/components/priceRangeSlider';
import ProductsGrid from '../productGrid';
import Pagination from '@/components/pagination';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import { useCategoryFilter } from '@/hooks/useCategoryFilter';
import { useSortOrder } from '@/hooks/useSortOrder';
import FilteredCategories from '@/components/filteredCategories';
import { FiChevronDown } from 'react-icons/fi';

const ITEMS_PER_PAGE = 12;

export default function FilteredProducts({ products, categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category');
  const currentPage = parseInt(searchParams.get('page') || '1');

  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const { selectedCategories, handleCategoryChange, clearCategories } = useCategoryFilter();
  const { sortOrder, handleSortChange } = useSortOrder();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Filtra os produtos
  const filteredProducts = useFilteredProducts(products, search, priceRange, selectedCategories, sortOrder);

  // Calcula a paginação
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Atualiza as categorias selecionadas quando a URL muda
  useEffect(() => {
    if (category) {
      const categoryId = parseInt(category);
      handleCategoryChange(categoryId);
    } else {
      clearCategories();
    }
  }, [category, handleCategoryChange, clearCategories]);

  // Handler para mudança de página
  const handlePageChange = useCallback((page) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    router.push(`/products?${newSearchParams.toString()}`);
  }, [router, searchParams]);

  // Handler para mudança de categoria nos checkboxes
  const handleCategoryChangeAndUpdateURL = useCallback((categoryId) => {
    handleCategoryChange(categoryId);
    const newSearchParams = new URLSearchParams(searchParams);
    if (selectedCategories.includes(categoryId)) {
      newSearchParams.delete('category');
    } else {
      newSearchParams.set('category', categoryId.toString());
    }
    newSearchParams.delete('page'); // Reset para página 1 ao mudar categoria
    router.push(`/products?${newSearchParams.toString()}`);
  }, [router, searchParams, selectedCategories, handleCategoryChange]);

  const handleFilterChange = (min, max) => {
    setPriceRange({ min, max });
    // Reset para página 1 ao mudar filtro
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('page');
    router.push(`/products?${newSearchParams.toString()}`);
  };

  return (
    <main className={styles.container}>


      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader} onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
          <h2>Filtros</h2>
          <FiChevronDown className={`${styles.toggleIcon} ${isFiltersOpen ? styles.open : ''}`} />
        </div>

        <div className={`${styles.sidebarContent} ${isFiltersOpen ? styles.open : ''}`}>
          <section>
            <h2>Filtros</h2>
            <hr className={styles.hr} />
            <PriceRangeSlider products={products} onFilterChange={handleFilterChange} />

            <hr className={styles.hr} />
            <FilteredCategories
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChangeAndUpdateURL}
            />

            <hr className={styles.hr} />
            <div className={styles.sort}>
              <label htmlFor="sort">Ordenar por preço:</label>
              <select 
                id="sort" 
                value={sortOrder} 
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="default">Padrão</option>
                <option value="asc">Menor preço</option>
                <option value="desc">Maior preço</option>
              </select>
            </div>
          </section>
        </div>
      </aside>

      <section className={styles.productsSection}>
        {search && (
          <div className={styles.searchInfo}>
            Pesquisa por "{search}"
          </div>
        )}
        
        <Suspense fallback={<p className={styles.loading}>Carregando produtos...</p>}>
          <ProductsGrid products={paginatedProducts} searchTerm={search} />
        </Suspense>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </main>
  );
}
