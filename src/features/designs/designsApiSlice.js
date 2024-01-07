import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const designsAdapter = createEntityAdapter();

const initialState = designsAdapter.getInitialState();

export const designsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        getDesigns: builder.query({
            query: () => '/designs',
            validStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 60,
            transformResponse: (responseData) => {
                const loadedDesigns = responseData.map((design) => {
                    design.id = design._id;
                    return design;
                });
                return designsAdapter.setAll(initialState, loadedDesigns);
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [
                        { type: 'Designs', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'Design', id }))
                    ]
                } else {
                    return [{ type: 'Designs', id: 'LIST' }]
                }
            }
        }),

        addNewDesign: builder.mutation({
            query: intialDesignData => ({
                url: '/designs',
                method: 'POST',
                body: { ...intialDesignData }
            }),
            invalidatesTags: [{ type: 'Design', id: 'LIST' }]
        }),

        updateDesign: builder.mutation({
            query: updatedDesignData => ({
                url: '/designs',
                method: 'PATCH',
                body: { ...updatedDesignData }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Design', id: arg.id }]
        }),

        deleteDesign: builder.mutation({
            query: ({ id }) => ({
                url: '/designs',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Design', id: arg.id }]
        })
    })
});

export const {
    useGetDesignsQuery,
    useAddNewDesignMutation,
    useUpdateDesignMutation,
    useDeleteDesignMutation
} = designsApiSlice;

export const selectDesignResult = designsApiSlice.endpoints.getDesigns.select();

const selectDesignsData = createSelector(
    selectDesignResult,
    designsResult => designsResult.data
);

export const {
    selectAll: selectAllDesigns,
    selectById: selectDesignById,
    selectIds: selectDesignIds
} = designsAdapter.getSelectors(state => selectDesignsData(state) ?? initialState);