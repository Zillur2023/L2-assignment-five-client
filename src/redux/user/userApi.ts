import { baseApi } from "../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userInfo) => ({
        url: "user/create-user",
        method: "POST",
        body: userInfo,
      }),
    }),
    getAllUser: builder.query({
      query: () => ({
        url: `/user/allUser`,
        method: "GET",
      }),
    }),
    getUser: builder.query({
      query: (email) => ({
        url: `/user/${email}`,
        method: "GET",
      }),
    }),
    getUserById: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `/user/update/${user._id}`,
        method: 'PUT',
        body: user,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useGetAllUserQuery, useGetUserQuery, useGetUserByIdQuery, useUpdateUserMutation } =
  userApi;
