import React, { useEffect, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import getRoutes from "./routes";
import {
  useGetOrUpdateTokenQuery,
  useLoginByPhoneCallMutation,
} from "@entities/login";
import { LoadingIndicator } from "@shared/ui/loadingIndicator";

const AppRouter: React.FC = () => {
  const [login] = useLoginByPhoneCallMutation();

  useEffect(() => {
    login({ phone: "79092991333" });
  }, []);

  const { isFetching } = useGetOrUpdateTokenQuery();

  const isAuthorized = true;

  const router = useMemo(() => {
    const routes = getRoutes(isAuthorized);
    return createBrowserRouter(routes);
  }, [isAuthorized]);

  if (isFetching) {
    return <LoadingIndicator />;
  }

  return <RouterProvider router={router} />;
};

export default AppRouter;
