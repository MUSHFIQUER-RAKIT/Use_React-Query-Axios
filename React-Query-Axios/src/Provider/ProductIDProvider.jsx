import { ProductIDContext } from "../context";

export default function ProductIDProvider({ children }) {
  return <ProductIDContext.Provider>{children}</ProductIDContext.Provider>;
}
