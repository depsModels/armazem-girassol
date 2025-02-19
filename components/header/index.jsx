'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import logoImg from '@/public/assets/images/logoWithoutBg.png';
import styles from './styles.module.css';
import InputHeader from '../inputHeader';
import CartIcon from '../cart/cartIcon';
import CartModal from '../cart/cartModal';
import CheckoutModal from '../cart/checkoutModal';
import { useCheckoutLogic } from '@/hooks/useCheckoutLogic';
import { useCartLogic } from '@/hooks/useCartLogic';
import Nav from '../nav';

export default function Header() {
  const { cart, removeFromCart, clearCart, calculateTotalPrice, isOpen, openCart, closeCart } = useCartLogic();
  const { formData, handleInputChange, generateWhatsAppMessage } = useCheckoutLogic(cart);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
  };

  return (
    <>
      <CartIcon cartCount={cart.length} onClick={openCart} />
      {isOpen && (
        <CartModal
          cart={cart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          calculateTotalPrice={calculateTotalPrice}
          onClose={closeCart}
          onCheckout={handleCheckout}
        />
      )}
      {isCheckoutModalOpen && (
        <CheckoutModal
          formData={formData}
          handleInputChange={handleInputChange}
          generateWhatsAppMessage={generateWhatsAppMessage}
          onClose={() => setIsCheckoutModalOpen(false)}
        />
      )}
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href='/'>
            <Image 
              src={logoImg} 
              alt='Flor logo'
              width={150}
              height={100}
              loading="eager"
            />
          </Link>
          <Link href='/' className={styles.title}>
            <h2>Armazem Girassol</h2>
          </Link>
        </div>

        <InputHeader />

        <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </header>
      
    </>
  );
}
