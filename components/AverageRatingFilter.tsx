import React, { useState } from "react";
import type { Filter } from "../types";

type Props = {
  onChange: (filter: Filter) => void;
};

const AverageRatingFilter: React.FC<Props> = ({ onChange }) => {
  const [selected, setSelected] = useState<Set<number>>(new Set([]));

  const handleChange = (rating: number, isChecked: boolean) => {
    const draft = structuredClone(selected);
    if (isChecked) {
      draft.add(rating);
    } else {
      draft.delete(rating);
    }

    onChange(draft.size ? (product) => draft.has(product.rating) : null);

    setSelected(draft);
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
      <h4>Rating</h4>
      <ul>
        {[1, 2, 3, 4, 5].map((rating) => (
          <li key={rating} style={{ listStyle: "none" }}>
            <label htmlFor="rating" style={{ display: "flex", gap: "12px" }}>
              <input
                onChange={(e) => handleChange(rating, e.target.checked)}
                type="checkbox"
                name="rating"
                value={rating}
              />
              {"★".repeat(rating).padEnd(5, "☆")}
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AverageRatingFilter;
