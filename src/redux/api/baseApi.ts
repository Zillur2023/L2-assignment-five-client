import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import config from "../../config";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: `${config.server_url}/api`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    
    if (token) {
      headers.set("authorization", `${token}`);
    }
    
    return headers;
  },
});


const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result:any = await baseQuery(args, api, extraOptions);

  // if (result?.error?.data?.err?.statusCode === 401) {
  // if (result?.error?.status === 404) {
  //   toast.error('User not found')
  // }
  // if (result?.error?.status === 403) {
  //   toast.error('Password not match')
  // }

  if (result?.error?.status === 401) {
    //* Send Refresh

    const res = await fetch(`${config.server_url}/api/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["User","Service", "Slot","Booking","Review"],
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
