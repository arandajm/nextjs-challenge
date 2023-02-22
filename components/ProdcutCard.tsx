/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { Product } from "../types";

type Props = { product: Product };

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        border: "1px solid #000",
      }}
    >
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{"★".repeat(product.rating).padEnd(5, "☆")}</p>
      <p>
        {product.price.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
        })}
      </p>
    </div>
  );
};

export default ProductCard;
