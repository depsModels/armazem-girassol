import { useMemo } from 'react';

export function useFilteredProducts(products, searchTerm, priceRange, selectedCategories, sortOrder) {
  return useMemo(() => {
    let filtered = [...products];

    // Aplicar filtros
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.nome.toLowerCase().includes(searchLower)
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.idCategoria)
      );
    }

    filtered = filtered.filter(product =>
      product.preco >= priceRange.min && product.preco <= priceRange.max
    );

    // Ordenar por disponibilidade primeiro
    filtered.sort((a, b) => {
      // Primeiro critério: disponibilidade
      if (a.quantidade === 0 && b.quantidade > 0) return 1;
      if (a.quantidade > 0 && b.quantidade === 0) return -1;
      
      // Segundo critério: preço
      if (sortOrder === 'asc') {
        return a.preco - b.preco;
      } else if (sortOrder === 'desc') {
        return b.preco - a.preco;
      }
      
      return 0;
    });

    return filtered;
  }, [products, searchTerm, priceRange, selectedCategories, sortOrder]);
}
