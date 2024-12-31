import { useQuery } from "react-query";

export const useSearchProduct = () => {
  const fetchProduct = async () => {

    const response = await fetch(`https://fakestoreapi.com/products`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error fetching products");
    }

    return response.json();
  };

  const { data: result, isLoading ,isError} = useQuery(
    ["SearchProduct"],
    fetchProduct
  );

  return { result, isLoading , isError };
};

export const useSearchSingleProduct = (id: string) => {
  const fetchSingleProduct = async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Error fetching product");
    }

    return response.json();
  };
  const { data: result, isLoading ,isError } = useQuery(
    ["SearchSingleProduct", id],
    fetchSingleProduct
  );
  return { result, isLoading ,isError};

}