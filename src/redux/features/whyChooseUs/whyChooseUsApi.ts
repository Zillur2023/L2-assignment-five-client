import { baseApi } from "../../api/baseApi";

export const whyChooseUsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllWhyChooseUs: builder.query({
      query: () => ({
        url: "/whyChooseUs/all-whyChooseUs",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllWhyChooseUsQuery } = whyChooseUsApi;
