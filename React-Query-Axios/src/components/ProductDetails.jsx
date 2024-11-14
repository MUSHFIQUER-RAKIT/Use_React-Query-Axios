/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const retrieveProduct = async ({ queryKey }) => {
  console.log(queryKey);
  const response = await axios.get(
    `http://localhost:3000/${queryKey[0]}/${queryKey[1]}`
  );
  return response.data;
};

export default function ProductDetails({ id }) {
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: retrieveProduct,
  });
  if (isLoading) return <div>Fetching Products Details...</div>;
  if (error) return <div>An Error Occured {error.message}</div>;

  return (
    <div className="w-1/5 my-2">
      <h1 className="text-3xl">Product Details</h1>
      <div className="border bg-gray-100 p-1 text-md rounded flex flex-col">
        <img
          className="object-cover h-24 w-24 border rounded-full m-auto"
          src={product.thumbnail}
          alt={product.title}
        />
        <p>{product.title}</p>
        <p>{product.description}</p>
        <p>USD {product.price}</p>
        <p>{product.rating}/5</p>
      </div>
    </div>
  );
}