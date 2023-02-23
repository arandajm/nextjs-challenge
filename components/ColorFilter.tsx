import React, { useMemo, useState } from "react";
import type { Filter, Product } from "../types";

type Props = {
  products: Product[];
  onChange: (filter: Filter) => void;
};

const ColorFilter: React.FC<Props> = ({ products, onChange }) => {
  const [selected, setSelected] = useState<Set<string>>(new Set([]));

  const handleChange = (color: string, isChecked: boolean) => {
    const draft = structuredClone(selected);
    if (isChecked) {
      draft.add(color);
    } else {
      draft.delete(color);
    }

    onChange(draft.size ? (product) => draft.has(product.color) : null);

    setSelected(draft);
  };

  const colors = useMemo(
    () => Array.from(new Set(products.map((product) => product.color))),
    [products]
  );

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
      <h4>Colors</h4>
      <ul>
        {colors.map((color) => (
          <li key={color} style={{ display: "flex", gap: "12px" }}>
            <input
              onChange={(e) => handleChange(color, e.target.checked)}
              type="checkbox"
              name="color"
              value={color}
            />
            <label htmlFor="color">{color}</label>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ColorFilter;
