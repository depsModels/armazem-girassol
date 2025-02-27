import { Suspense } from 'react';
import { getProducts } from '@/lib/products';
import { getCategories } from '@/lib/categories';
import FilteredProducts from '@/components/products/filteredProducts';

export default async function ProductsPage({ searchParams }) {
  const categoryId = await searchParams?.category ? parseInt(searchParams.category) : null;
  const products = await getProducts(categoryId);
  const categories = await getCategories();

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <FilteredProducts products={products} categories={categories} />
    </Suspense>
  );
}