'use client';

import ProductItem from '../productItem';
import styles from './styles.module.css';

export default function ProductsGrid({ products, searchTerm = '' }) {
  return (
    <div className={styles.gridContainer}>
      {products.length > 0 ? (
        <ul className={styles.products}>
          {products.map(product => (
            <li key={product.id}>
              <ProductItem 
                id={`/${product.id}`}
                nome={product.nome}
                preco={product.preco}
                image={product.imagem}
                unidade_medida={product.unidade_medida}
                quantidade={product.quantidade}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.emptyState}>
          <p>Não há nenhum produto correspondente à sua pesquisa.</p>
          <p>Tente usar termos diferentes ou verificar a ortografia.</p>
        </div>
      )}
    </div>
  );
}
