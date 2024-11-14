import { useContext } from "react";
import "./App.css";
import AddProduct from "./components/AddProduct";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";
import { ProductIDContext } from "./context";

function App() {
  const { detailsID } = useContext(ProductIDContext);
  return (
    <div className="flex m-2">
      <AddProduct />
      <ProductList />
      <ProductDetails id={detailsID} />
    </div>
  );
}

export default App;
