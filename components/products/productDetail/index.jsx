'use client';

import Image from 'next/image';
import styles from './styles.module.css';
import { FiShoppingCart } from 'react-icons/fi';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { capitalizeWords } from '@/utils/formatText';

export default function ProductDetail({ product }) {
  const imageSrc = product.imagem || '/assets/images/noImage.png';
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(
    product.unidade_medida === 'KG' ? 100 : 1
  );

  const handleQuantityChange = (e) => {
    const value = Math.max(10, Math.ceil(Number(e.target.value) / 10) * 10); 
    setQuantity(value);
  };

  const handleIncrement = () => {
    const step = product.unidade_medida === 'KG' ? 10 : 1;
    setQuantity(prev => prev + step);
  };

  const handleDecrement = () => {
    const step = product.unidade_medida === 'KG' ? 10 : 1;
    const minValue = product.unidade_medida === 'KG' ? 10 : 1;
    setQuantity(prev => Math.max(minValue, prev - step));
  };

  const pricePer100g = product.unidade_medida === 'KG' 
    ? (product.preco / 10).toFixed(2) 
    : product.preco.toFixed(2);

  const totalPrice = product.unidade_medida === 'KG'
    ? ((product.preco / 1000) * quantity).toFixed(2)
    : (product.preco * quantity).toFixed(2);

  const unitLabel = product.unidade_medida === 'KG' ? `${quantity}g` : `${quantity} UN`;

  // Verificar se o produto está disponível
  const isAvailable = product.quantidade > 0;

  return (
    <div className={styles.productContainer}>
      <div className={styles.productWrapper}>
        <div className={styles.imageSection}>
          <div className={styles.imageBorder}>
            <Image 
              src={imageSrc} 
              alt={product.nome} 
              width={500}
              height={500}
              className={styles.mainImage} 
              priority 
            />
          </div>
        </div>
        
        <div className={styles.productInfo}>
          <div className={styles.productHeader}>
            <span className={`${styles.badge} ${!isAvailable ? styles.unavailable : ''}`}>
              {isAvailable ? 'Disponível' : 'Indisponível'}
            </span>
            <h1 className={styles.productTitle}>{capitalizeWords(product.nome)}</h1>
          </div>

          <div className={styles.productDetails}>
            <p className={styles.productDescription}>
              {product.descricao}
            </p>

            <span className={styles.productPrice}>
              R$ {pricePer100g}
              <span className={styles.unitLabel}>/{product.unidade_medida === 'KG' ? '100g' : 'UN'}</span>
            </span>

            {isAvailable ? (
              <div className={styles.purchaseSection}>
                <div className={styles.quantityControl}>
                  <button 
                    onClick={handleDecrement} 
                    className={styles.quantityButton}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={product.unidade_medida === 'KG' ? "10" : "1"}
                    step={product.unidade_medida === 'KG' ? "10" : "1"}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className={styles.quantityInput}
                  />
                  <button 
                    onClick={handleIncrement} 
                    className={styles.quantityButton}
                  >
                    +
                  </button>
                </div>

                <div className={styles.totalPriceSection}>
                  <span className={styles.totalPriceLabel}>Total:</span>
                  <span className={styles.totalPrice}>R$ {totalPrice}</span>
                  <span className={styles.totalUnitLabel}>({unitLabel})</span>
                </div>

                <button
                  onClick={() => addToCart({
                    id: product.id,
                    name: product.nome,
                    price: product.preco,
                    quantity: quantity,
                    unit: product.unidade_medida
                  })}
                  className={styles.buyButton}
                >
                  <FiShoppingCart className={styles.icon} /> 
                  Adicionar ao Carrinho
                </button>
              </div>
            ) : (
              <div className={styles.unavailableMessage}>
                Produto temporariamente indisponível
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
