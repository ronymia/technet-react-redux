import { api } from '@/redux/api/apiSlice';

const productsEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: `/products` }),
    }),
    getSingleProduct: builder.query({
      query: (id) => ({ url: `/product/${id}` }),
    }),
    postComment: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['comments'],
    }),
    getComments: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comments'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  usePostCommentMutation,
  useGetCommentsQuery,
} = productsEndpoints;
