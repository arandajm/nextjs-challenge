import React, { useMemo } from "react";
import type { GetStaticProps, NextPage } from "next";
import type { Filter, Product } from "../types";
import api from "../api";
import ProductCard from "../components/ProductCard";
import PriceRangeFilter from "../components/PriceRangeFilter";
import ColorFilter from "../components/ColorFilter";
import AverageRatingFilter from "../components/AverageRatingFilter";

type Props = {
  products: Product[];
};

type Filters = Record<string, Filter>;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const products = await api.product.list();

  return {
    props: {
      products,
    },
  };
};

const Home: NextPage<Props> = ({ products }) => {
  const [filters, setFilters] = React.useState<Filters>({
    price: null,
    color: null,
    range: null,
  });

  const matchedProducts = useMemo(() => {
    const filterFunctionsToApply = Object.values(filters).filter(Boolean);

    let matches = products;

    for (let filterFunction of filterFunctionsToApply) {
      matches = matches.filter((product) => filterFunction!(product));
    }

    return matches;
  }, [products, filters]);

  return (
    <main style={{ display: "flex", gap: "12px" }}>
      <aside>
        <PriceRangeFilter />
        <ColorFilter
          onChange={(filter: Filter) =>
            setFilters((filters) => ({ ...filters, color: filter }))
          }
          products={products}
        />
        <AverageRatingFilter />
      </aside>
      <section
        style={{
          flex: "1",
          display: "grid",
          gap: "10px",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {matchedProducts.map((product) => (
          <article key={product.id}>
            <ProductCard product={product} />
          </article>
        ))}
      </section>
    </main>
  );
};

export default Home;
