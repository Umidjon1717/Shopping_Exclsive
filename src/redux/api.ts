import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  tagTypes: ["Product", "Wishlist"],
  endpoints: (build) => ({
    getProducts: build.query<any, { limit: number; skip: number }>({
      query: ({ limit, skip }) => `products?limit=${limit}&skip=${skip}`,
      providesTags: ["Product"],
    }),

    toggleWishlist: build.mutation<any, { productId: number; customerId: number }>({
      query: (body) => ({
        url: "like",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Wishlist", "Product"],
    }),


    getWishlist: build.query<any, number>({
      query: (customerId) => `like/customer/${customerId}`,
      providesTags: ["Wishlist"],
    }),
  }),
});

export const { 
  useGetProductsQuery, 
  useToggleWishlistMutation, 
  useGetWishlistQuery 
} = mainApi;
