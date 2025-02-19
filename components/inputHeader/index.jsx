'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { FiSearch } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function InputHeader() {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchRef = useRef(null);
  const searchTimeout = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!search.trim()) {
        setSuggestions([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(search.trim())}`);
        const data = await response.json();

        if (data.error) {
          console.error('API Error:', data.error);
          setError('Erro na busca');
          setSuggestions([]);
          return;
        }
        
        setSuggestions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setError('Erro ao buscar sugestões');
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(fetchSuggestions, 300);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/products?search=${encodeURIComponent(search)}`);
      setShowSuggestions(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div ref={searchRef} className={styles.searchWrapper}>
      <form onSubmit={handleSearch} className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Pesquisar produtos..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
        />
        <button type="submit" className={styles.searchButton}>
          <FiSearch size={20} />
        </button>
      </form>

      {showSuggestions && (search.trim() !== '') && (
        <div className={styles.suggestionsContainer}>
          {isLoading ? (
            <div className={styles.loadingMessage}>Buscando...</div>
          ) : error ? (
            <div className={styles.errorMessage}>{error}</div>
          ) : suggestions.length > 0 ? (
            suggestions.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className={styles.suggestionItem}
                onClick={() => {
                  setSearch('');
                  setShowSuggestions(false);
                }}
              >
                <div className={styles.suggestionContent}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={product.imagem || '/assets/images/noImage.png'}
                      alt={product.nome}
                      width={40}
                      height={40}
                      sizes="40px"
                      className={styles.productImage}
                    />
                  </div>
                  <div className={styles.productInfo}>
                    <span className={styles.productName}>{product.nome}</span>
                    <span className={styles.productPrice}>
                      {formatPrice(product.preco)}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className={styles.noResults}>Nenhum produto encontrado</div>
          )}
        </div>
      )}
    </div>
  );
}
