import { baseApi } from "../../api/baseApi";


export const slotApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      createSlot: builder.mutation({
        query: (data) => ({
          url: "/slot/create",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ['Slot']
      }),
      getAllSlots: builder.query({
        query: () => ({
          url: "/slot/allSlots",
          method: "GET",
        }),
        providesTags: ['Slot']
      }),
      updateSlot: builder.mutation({
        query: (slot) => ({
          url: `/slot/update/${slot._id}`,
          method: 'PUT',
          body: slot,
        }),
        invalidatesTags: ['Slot']
      }),
      availableSlot: builder.query({
        query: (service) => ({
          url: `/slot/available/${service}`,
          method: 'GET',
        }),
        providesTags: ['Slot']
      }),
    
    }),
  });

  export const { useCreateSlotMutation, useGetAllSlotsQuery, useUpdateSlotMutation, useAvailableSlotQuery } = slotApi;


  