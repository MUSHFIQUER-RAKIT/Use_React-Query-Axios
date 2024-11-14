import "./App.css";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="flex m-2">
      <ProductList />
      <ProductDetails id={5} />
    </div>
  );
}

export default App;
