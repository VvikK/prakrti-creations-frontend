import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const shapesAdapter = createEntityAdapter();

const initialState = shapesAdapter.getInitialState();

export const shapesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getShapes: builder.query({
            query: () => '/shapes',
            validStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 60,
            transformResponse: (responseData) => {
                const loadedShapes = responseData.map((shape) => {
                    shape.id = shape._id;
                    return shape;
                });
                return shapesAdapter.setAll(initialState, loadedShapes);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Shapes', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'Shape', id }))
                    ]
                } else {
                    return [{ type: 'Shapes', id: 'LIST' }]
                }
            }
        }),

        addNewShape: builder.mutation({
            query: intialShapeData => ({
                url: '/shapes',
                method: 'POST',
                body: { ...intialShapeData }
            }),
            invalidatesTags: [{ type: 'Shape', id: 'LIST' }]
        }),

        updateShape: builder.mutation({
            query: updatedShapeData => ({
                url: '/shapes',
                method: 'PATCH',
                body: { ...updatedShapeData }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Shape', id: arg.id }]
        }),

        deleteShape: builder.mutation({
            query: ({ id }) => ({
                url: '/shapes',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Shape', id: arg.id }]
        })
    })
});

export const {
    useGetShapesQuery,
    useAddNewShapeMutation,
    useUpdateShapeMutation,
    useDeleteShapeMutation
} = shapesApiSlice;

export const selectShapeResult = shapesApiSlice.endpoints.getShapes.select();

const selectShapesData = createSelector(
    selectShapeResult,
    shapesResult => shapesResult.data
);

export const {
    selectAll: selectAllShapes,
    selectById: selectShapeById,
    selectIds: selectShapeIds
} = shapesAdapter.getSelectors(state => selectShapesData(state) ?? initialState);