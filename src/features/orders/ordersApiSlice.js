import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const ordersAdapter = createEntityAdapter();

const initialState = ordersAdapter.getInitialState();

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getOrders: builder.query({
            query: () => '/orders',
            validStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 60,
            transformResponse: (responseData) => {
                const loadedOrders = responseData.map((order) => {
                    order.id = order._id;
                    return order;
                });
                return ordersAdapter.setAll(initialState, loadedOrders);
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [
                        { type: 'Orders', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'Order', id }))
                    ]
                } else {
                    return [{ type: 'Orders', id: 'LIST' }]
                }
            }
        }),

        addNewOrder: builder.mutation({
            query: intialOrderData => ({
                url: '/orders',
                method: 'POST',
                body: { ...intialOrderData }
            }),
            invalidatesTags: [{ type: 'Order', id: 'LIST' }]
        }),

        updateOrder: builder.mutation({
            query: updatedOrderData => ({
                url: '/orders',
                method: 'PATCH',
                body: { ...updatedOrderData }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Order', id: arg.id }]
        }),

        deleteOrder: builder.mutation({
            query: ({ id }) => ({
                url: '/orders',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Order', id: arg.id }]
        })
    })
});

export const {
    useGetOrdersQuery,
    useAddNewOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation
} = ordersApiSlice;

export const selectOrderResult = ordersApiSlice.endpoints.getOrders.select();

export const selectOrdersData = createSelector(
    selectOrderResult,
    (orderResult) => orderResult.data
);

export const {
    selectAll: selectAllOrders,
    selectById: selectOrderById,
    selectIds: selectOrderIds
} = ordersAdapter.getSelectors(state => selectOrdersData(state) ?? initialState);