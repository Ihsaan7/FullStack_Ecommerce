import { useState } from "react";
import { ProductContext } from "./ProductContext";

export const ProductProvider = ({ children }) => {
  const [selectProduct, setSelectProduct] = useState(null);

  return (
    <ProductContext.Provider value={{ selectProduct, setSelectProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
