import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const charmsAdapter = createEntityAdapter();

const initialState = charmsAdapter.getInitialState();

export const charmsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getCharms: builder.query({
            query: () => '/charms',
            validStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 60,
            transformResponse: (responseData) => {
                const loadedCharms = responseData.map((charm) => {
                    charm.id = charm._id;
                    return charm;
                });
                return charmsAdapter.setAll(initialState, loadedCharms);
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [
                        { type: 'Charms', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'Charm', id }))
                    ]
                } else {
                    return [{ type: 'Charms', id: 'LIST' }]
                }
            }
        }),

        addNewCharm: builder.mutation({
            query: intialCharmData => ({
                url: '/charms',
                method: 'POST',
                body: { ...intialCharmData }
            }),
            invalidatesTags: [{ type: 'Charm', id: 'LIST' }]
        }),

        updateCharm: builder.mutation({
            query: updatedCharmData => ({
                url: '/charms',
                method: 'PATCH',
                body: { ...updatedCharmData }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Charm', id: arg.id }]
        }),

        deleteCharm: builder.mutation({
            query: ({ id }) => ({
                url: '/charms',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Charm', id: arg.id }]
        })

    })
});

export const {
    useGetCharmsQuery,
    useAddNewCharmMutation,
    useUpdateCharmMutation,
    useDeleteCharmMutation
} = charmsApiSlice;

export const selectCharmResult = charmsApiSlice.endpoints.getCharms.select();

export const selectCharmsData = createSelector(
    selectCharmResult,
    charmResult => charmResult.data
);

export const {
    selectAll: selectAllCharms,
    selectById: selectCharmById,
    selectIds: selectCharmIds
} = charmsAdapter.getSelectors(state => selectCharmsData(state) ?? initialState);