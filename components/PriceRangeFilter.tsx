import React, { useState } from "react";
import type { Filter } from "../types";

type Props = {
  onChange: (filter: Filter) => void;
};

const PriceRangeFilter: React.FC<Props> = ({ onChange }) => {
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);

  const handleChangeMin = (minValue: number) => {
    setMin(minValue);
    onChange(
      minValue
        ? (product) => product.price >= minValue && product.price <= max
        : null
    );
  };

  const handleChangeMax = (maxValue: number) => {
    setMax(maxValue);
    onChange(
      maxValue
        ? (product) => product.price >= min && product.price <= maxValue
        : null
    );
  };

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        border: "1px solid black",
        padding: "12px",
      }}
    >
      <h4>Price</h4>

      <li style={{ listStyle: "none" }}>
        <label htmlFor="color" style={{ display: "flex", gap: "12px" }}>
          Minimo:
          <input
            onChange={(e) => handleChangeMin(Number(e.target.value))}
            type="number"
            name="min"
            value={min}
          />
        </label>
      </li>
      <li style={{ listStyle: "none" }}>
        <label htmlFor="color" style={{ display: "flex", gap: "12px" }}>
          Maximo:
          <input
            onChange={(e) => handleChangeMax(Number(e.target.value))}
            type="number"
            name="max"
            value={max}
          />
        </label>
      </li>
    </section>
  );
};

export default PriceRangeFilter;
