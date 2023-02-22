import type { GetStaticProps, NextPage } from "next";
import type { Product } from "../types";
import api from "../api";
import ProductCard from "../components/ProdcutCard";

type Props = {
  products: Product[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const products = await api.product.list();

  return {
    props: {
      products,
    },
  };
};

const Home: NextPage<Props> = ({ products }) => {
  console.log("%c⧭", "color: #ff0000", products);
  return (
    <main style={{ display: "flex", gap: "12px" }}>
      <aside>aca van los filtros</aside>
      <section
        style={{
          flex: "1",
          display: "grid",
          gap: "10px",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {products.map((product) => (
          <article key={product.id}>
            <ProductCard product={product} />
          </article>
        ))}
      </section>
    </main>
  );
};

export default Home;
