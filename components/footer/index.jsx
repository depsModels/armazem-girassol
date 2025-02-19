'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';
import { FaInstagram, FaFacebook, FaWhatsapp, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brandSection}>
          <div style={{ position: 'relative', width: 150, height: 100 }}>
            <Image 
              src="/assets/images/logoWithoutBg.png" 
              alt="Armazém Girassol Logo" 
              fill
              sizes="(max-width: 150px) 100vw, 150px"
              style={{ objectFit: 'contain' }}
              loading="lazy"
            />
          </div>
          <p className={styles.brandTagline}>
            Nutrindo vidas com saúde natural
          </p>
        </div>

        <div className={styles.contactSection}>
          <h3>Contato</h3>
          <div className={styles.contactInfo}>
            <p>
              <FaMapMarkerAlt /> Av. Cruz de Malta, 1402 - loja 1
              <br />Cruz de Malta, Charqueadas - RS
              <br />CEP: 96745-000
            </p>
            <p>
              <FaPhone /> +55 51 9757-2837
            </p>
          </div>
        </div>

        <div className={styles.socialSection}>
          <h3>Redes Sociais</h3>
          <div className={styles.socialLinks}>
            <Link 
              href="https://www.instagram.com/girassol.armazem/" 
              target="_blank" 
              className={styles.socialIcon}
            >
              <FaInstagram />
            </Link>
            <Link 
              href="https://www.facebook.com/profile.php?id=100081621585388" 
              target="_blank" 
              className={styles.socialIcon}
            >
              <FaFacebook />
            </Link>
            <Link 
              href="https://wa.me/5551997572837" 
              target="_blank" 
              className={styles.socialIcon}
            >
              <FaWhatsapp />
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        {new Date().getFullYear()} Armazém Girassol. Todos os direitos reservados.
      </div>
    </footer>
  );
}
