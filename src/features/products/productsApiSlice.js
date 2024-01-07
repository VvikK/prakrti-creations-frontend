import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState();

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getProducts: builder.query({
            query: () => '/products',
            validStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 60,
            transformResponse: (responseData) => {
                const loadedProducts = responseData.map((product) => {
                    product.id = product._id;
                    return product;
                });
                return productsAdapter.setAll(initialState, loadedProducts);
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [
                        { type: 'Products', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'Product', id }))
                    ]
                } else {
                    return [{ type: 'Products', id: 'LIST' }]
                }
            }
        }),

        addNewProduct: builder.mutation({
            query: intialProductData => ({
                url: '/products',
                method: 'POST',
                body: { ...intialProductData }
            }),
            invalidatesTags: [{ type: 'Product', id: 'LIST' }]
        }),

        updateProduct: builder.mutation({
            query: updatedProductData => ({
                url: '/products',
                method: 'PATCH',
                body: { ...updatedProductData }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Product', id: arg.id }]
        }),

        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: '/products',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Product', id: arg.id }]
        })
    })
});

export const {
    useGetProductsQuery,
    useAddNewProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productsApiSlice;

export const selectProductResult = productsApiSlice.endpoints.getProducts.select();

export const selectProductsData = createSelector(
    selectProductResult,
    productsResult => productsResult.data
);

export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectIds: selectProductIds
} = productsAdapter.getSelectors(state => selectProductsData(state) ?? initialState);