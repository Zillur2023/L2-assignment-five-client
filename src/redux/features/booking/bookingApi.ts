import { baseApi } from "../../api/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingData) => {
        // Log bookingData for debugging
        console.log({ bookingData });

        return {
          url: "/booking/create",
          method: "POST",
          body: bookingData,
        };
      },
      invalidatesTags:['Booking']
    }),
    getAllBooking: builder.query({
      query: () => ({
        url: "/booking/all-booking",
        method: "GET",
      }),
      providesTags: ['Booking']
    }),
    getMyBooking: builder.query({
      query: (email) => ({
        url: `/booking/my-booking/${email}`,
        method: "GET",
      }),
      providesTags: ['Booking']
    }),
  }),
});

export const { useCreateBookingMutation, useGetAllBookingQuery, useGetMyBookingQuery } = bookingApi;
