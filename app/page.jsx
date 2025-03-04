import styles from "./page.module.css";
import Link from "next/link";
import ImageSlideshow from "@/components/imageSlideshow";
import ListCategories from "@/components/listCategories";
import { getCategories } from "@/lib/categories";
import ListProductsByCategory from "@/components/products/listProductsByCategory";

async function Categories() {
  try {
    const categories = await getCategories();
    return <ListCategories categories={categories} />;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return <div>Error loading categories</div>;
  }
}

export default function Home() {
  return (
    <>
      <div className={styles.categories}>
        <Categories />
      </div>
      
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.hero}>
            <h1 className={styles.title}>

            O a granel mais queridinho da região.
            </h1>
            <p>De um giro na sua vida com os  produtos do Armazem Girassol.</p>
          </div>
          <button className={styles.cta}>
            <Link href="/products">Conheça nossos produtos!</Link>
          </button>
        </div>
        <div className={styles.slideshow}>
          <ImageSlideshow />
        </div>
      </header>
      <main>
        <ListProductsByCategory />
      </main>
    </>
  );
}
