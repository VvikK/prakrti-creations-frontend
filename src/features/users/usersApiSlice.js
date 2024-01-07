import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        getUsers: builder.query({
            query: () => '/users',
            validStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 60,
            transformResponse: (responseData) => {
                const loadedUsers = responseData.map((user) => {
                    user.id = user._id;
                    return user;
                });
                return usersAdapter.setAll(initialState, loadedUsers);
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [
                        { type: 'Users', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'User', id }))
                    ]
                } else {
                    return [{ type: 'Users', id: 'LIST' }]
                }
            }
        }),

        updateUser: builder.mutation({
            query: updatedUserData => ({
                url: '/users',
                method: 'PATCH',
                body: { ...updatedUserData }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
        }),

        updateUserCart: builder.mutation({
            query: ({ id, product_id, action}) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body: { product_id, action }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
        }),

        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: '/users',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
        })

    })
});

export const {
    useGetUsersQuery,
    useUpdateUserMutation,
    useUpdateUserCartMutation,
    useDeleteUserMutation
} = usersApiSlice;

export const selectUserResult = usersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
    selectUserResult,
    usersResult => usersResult.data
);

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState);