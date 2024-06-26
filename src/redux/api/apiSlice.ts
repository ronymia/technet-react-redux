import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:5000/` }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: `/products` }),
    }),
    getSingleProduct: builder.query({
      query: (id) => ({ url: `/product/${id}` }),
    }),
  }),
});

export const { useGetProductsQuery, useGetSingleProductQuery } = api;
