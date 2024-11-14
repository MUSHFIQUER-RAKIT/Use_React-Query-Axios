import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function AddProduct() {
  const queryClient = useQueryClient();

  const [state, setState] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 5,
    thumbnail: "",
  });

  const mutation = useMutation({
    mutationFn: newProduct =>
      axios.post("http://localhost:3000/products", newProduct),
    onSuccess: (data, variables, context) => {
      console.log(context);
      queryClient.invalidateQueries(["products"]);
    },
    onMutate: variables => {
      return { greeting: "Hello" };
    },
  });

  const submitData = event => {
    event.preventDefault();
    console.log(state);

    const newData = { ...state, id: crypto.randomUUID().toString() };

    mutation.mutate(newData);
  };

  const handleChange = event => {
    const name = event.target.name;
    const value =
      event.target.type === "number"
        ? event.target.valueAsNumber
        : event.target.value;
    setState({ ...state, [name]: value });
  };

  if (mutation.isLoading) {
    return <span>Submitting...</span>;
  }
  if (mutation.isError) {
    return <span>Error :{mutation.error.message}</span>;
  }

  return (
    <div className="m-2 p-2 bg-gray-100 w-1/5 h-1/2">
      <h2 className="text-2xl m-2">Add A Product</h2>
      {mutation.isSuccess && <p>Product Added</p>}
      <form className="flex flex-col" onSubmit={submitData}>
        <input
          type="text"
          value={state.title}
          name="title"
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product title"
        />
        <textarea
          value={state.description}
          name="description"
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product description"
        />

        <input
          type="number"
          value={state.price}
          name="price"
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product price"
        />
        <input
          type="text"
          value={state.thumbnail}
          name="thumbnail"
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product thumbnail URL"
        />

        <button
          type="submit"
          className="bg-black m-auto text-white text-xl p-1 rounded-md text-right"
        >
          Add
        </button>
      </form>
    </div>
  );
}
