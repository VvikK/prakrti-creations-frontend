import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const beadsAdapter = createEntityAdapter();

const initialState = beadsAdapter.getInitialState();

export const beadsApiSlice = apiSlice({
    endpoints: (builder) => ({
        getBeads: builder.query({
            query: () => '/beads',
            validStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 60,
            transformResponse: (responseData) => {
                const loadedBeads = responseData.map((bead) => {
                    bead.id = bead._id;
                    return bead;
                });
                return beadsAdapter.setAll(initialState, loadedBeads);
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [
                        { type: 'Beads', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'Bead', id }))
                    ]
                } else {
                    return [{ type: 'Beads', id: 'LIST' }]
                }
            }
        }),

        addNewBead: builder.mutation({
            query: (intialBeadData) => ({
                url: '/beads',
                method: 'POST',
                body: { ...intialBeadData }
            }),
            invalidatesTags: [{ type: 'Bead', id: 'LIST' }]
        }),

        updateBead: builder.mutation({
            query: ({ updatedBeadData }) => ({
                url: '/beads',
                method: 'PATCH',
                body: { ...updatedBeadData }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Bead', id: arg.id }]
        }),

        deleteBead: builder.mutation({
            query: ({ id }) => ({
                url: 'beads',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Bead', id: arg.id }]
        })
    })
});

export const {
    useGetBeadsQuery,
    useAddNewBeadMutation,
    useUpdateBeadMutation,
    useDeleteBeadMutation
} = beadsApiSlice;

export const selectBeadResult = beadsApiSlice.endpoints.getBeads.select();

export const selectBeadsData = createSelector(
    selectBeadResult,
    beadResult => beadResult.data
);

export const {
    selectAll: selectAllBeads,
    selectById: selectBeadById,
    selectIds: selectBeadIds
} = beadsAdapter.getSelectors(state => selectClassesData(state) ?? initialState);