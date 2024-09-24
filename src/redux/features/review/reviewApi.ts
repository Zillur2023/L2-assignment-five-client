import { baseApi } from "../../api/baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (reviewInfo) => {
        console.log({reviewInfo})
        
    return {url: "/review/create",
    method: "POST",
    body: reviewInfo }
      },
    }),
    getAllReview: builder.query({
      query: () => ({
        url: "/review/all-review",
        method: "GET",
        
      }),
    }),
  }),
});

export const {
    useCreateReviewMutation,
  useGetAllReviewQuery,
} = reviewApi;
