import { baseApi } from "../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userInfo) => ({
        url: "user/create-user",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["User"]
    }),
    getAllUser: builder.query({
      query: () => ({
        url: `/user/allUser`,
        method: "GET",
      }),
      providesTags: ["User"]
    }),
    getUser: builder.query({
      query: (email) => ({
        url: `/user/${email}`,
        method: "GET",
      }),
      providesTags: ["User"]
    }),
    getUserById: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["User"]
    }),
    updateProfile: builder.mutation({
      query: (user) => ({
        url: `/user/update/${user._id}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ["User"]
    }),
  }),
});

export const { useCreateUserMutation, useGetAllUserQuery, useGetUserQuery, useGetUserByIdQuery, useUpdateProfileMutation } =
  userApi;
