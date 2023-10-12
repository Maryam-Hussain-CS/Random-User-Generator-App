import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URLS from "./config";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URLS.users, // Use the URL from the configuration
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "api",
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
