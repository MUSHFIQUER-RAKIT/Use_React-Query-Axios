import { useState } from "react";
import { ProductIDContext } from "../context";

export default function ProductIDProvider({ children }) {
  const [detailsID, setDetailsID] = useState(1);

  function handleShowDetail(id) {
    setDetailsID(id);
  }

  return (
    <ProductIDContext.Provider value={{ detailsID, handleShowDetail }}>
      {children}
    </ProductIDContext.Provider>
  );
}
