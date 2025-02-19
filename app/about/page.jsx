'use client';

import Image from 'next/image';
import { FaWhatsapp, FaLeaf, FaHistory, FaBullseye, FaStore } from 'react-icons/fa';
import styles from './styles.module.css';

export default function AboutPage() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5551997572837', '_blank');
  };

  return (
    <main className={styles.container}>
      <section className={styles.heroSection}>
        <div className={styles.imageContainer}>
          <Image
            src="/assets/images/armazem.webp"
            alt="Armazém Girassol"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className={styles.storeImage}
          />
          <div className={styles.heroOverlay}>
            <h1 className={styles.heroTitle}>Armazém Girassol</h1>
            <p className={styles.heroSubtitle}>Cultivando saúde e bem-estar para a comunidade</p>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contentHeader}>
          <h2 className={styles.contentTitle}>Nossa Jornada</h2>
          <p className={styles.contentDescription}>
            Conheça mais sobre nossa história e compromisso com a qualidade
          </p>
        </div>

        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.timelineIcon}>
              <FaHistory />
            </div>
            <div className={styles.timelineContent}>
              <h3>Nossa História</h3>
              <p>
                O Armazém Girassol nasceu do sonho de oferecer produtos de qualidade a preços justos para nossa comunidade. 
                Com anos de experiência no mercado, nos especializamos em produtos naturais, grãos, cereais e produtos a granel.
              </p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineIcon}>
              <FaBullseye />
            </div>
            <div className={styles.timelineContent}>
              <h3>Nossa Missão</h3>
              <p>
                Proporcionar aos nossos clientes uma experiência única de compra, oferecendo produtos selecionados, 
                atendimento personalizado e preços competitivos.
              </p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineIcon}>
              <FaLeaf />
            </div>
            <div className={styles.timelineContent}>
              <h3>Nossos Valores</h3>
              <p>
                Comprometimento com a qualidade, respeito ao meio ambiente e valorização da saúde e bem-estar 
                de nossos clientes são os pilares que guiam nossa atuação.
              </p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineIcon}>
              <FaStore />
            </div>
            <div className={styles.timelineContent}>
              <h3>Venha nos Conhecer</h3>
              <p>
                Estamos prontos para recebê-lo em nossa loja com um ambiente acolhedor e produtos selecionados 
                especialmente para você. Tire suas dúvidas, faça seu pedido ou agende uma visita!
              </p>
              <button onClick={handleWhatsAppClick} className={styles.timelineButton}>
                <FaWhatsapp size={20} style={{ marginRight: '8px' }} />
                Fale Conosco no WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
