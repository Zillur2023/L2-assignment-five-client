import { baseApi } from "../../api/baseApi";


export const serviceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      createService: builder.mutation({
        query: (data) => ({
          url: "/service/create",
          method: "POST",
          body: data,
        }),
        invalidatesTags:['Service']
      }),
      getAllServices: builder.query({
        query: (params) => ({
          url: "/service/all-service",
          method: "GET",
          params,
        }),
        providesTags:['Service'],
      }),
      getService: builder.query({
        query: (params) => ({
          url: `/service/${params}`,
          method: "GET",
        }),
        providesTags:['Service'],
      }),
      updateService: builder.mutation({
        query: (service) => ({
          url: `/service/update/${service._id}`,
          method: 'PUT',
          body: service,
        }),
        invalidatesTags: ['Service']
      }),
      deleteService: builder.mutation({
        query: (id) => ({
          url: `/service/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ['Service']
      }),
      maxPrice: builder.query({
        query: () => ({
          url: `/service/max-price`,
          method: "GET",
        }),
        providesTags: ['Service'],
      }),
    }),
  });
  
  export const { useCreateServiceMutation, useGetAllServicesQuery, useGetServiceQuery, useUpdateServiceMutation, useDeleteServiceMutation, useMaxPriceQuery } = serviceApi