import { Product } from "./types";

export const fetchProductsFiltered = async (query: string) => {
  const baseUrl = apiUrl + "/products?populate=*&filters[sold][$eq]=false";
  const url = query?.length > 0 ? baseUrl + query : baseUrl;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log(data, "this is the data again");
  return data;
};

export const getPublicData = async (query: string) => {
  try {
    const url = apiUrl + query;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data, "this is the data again");
    if (data?.data) {
      return data.data;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;
