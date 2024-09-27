import { baseApi } from "../../api/baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (reviewInfo) => {
        
    return {url: "/review/create",
    method: "POST",
    body: reviewInfo }
      },
      invalidatesTags: ["Review"]
    }),
    getAllReview: builder.query({
      query: () => ({
        url: "/review/all-review",
        method: "GET",
        
      }),
      providesTags: ["Review"]
    }),
  }),
});

export const {
    useCreateReviewMutation,
  useGetAllReviewQuery,
} = reviewApi;
