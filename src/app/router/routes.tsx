import { Navigate, RouteObject } from "react-router-dom";
import { PATHS, absolutePath } from "./paths";
import PrivateLayout from "./privateLayout";
import { Catalog } from "@pages/catalog";
import { Cart } from "@pages/cart";
import { Checkout } from "@entities/cart/checkout/ui/checkout";

interface PrivateRoute {
  private?: boolean;
}

type Route = RouteObject & PrivateRoute;

const routesConfig: Route[] = [
  {
    path: PATHS.HOME.INDEX,
    private: true,
    children: [
      { index: true, element: <Catalog /> },
      {
        // element: <Settings />,
      },
    ],
  },
  {
    path: PATHS.LOGIN,
    // element: <Login />,
  },
  {
    path: PATHS.CART.INDEX,
    private: true,
    children: [
      {
        index: true,
        element: <Cart />,
      },
      {
        path: PATHS.CART.ORDER_FORM,
        element: <Checkout />,
      },
    ],
  },
];

const getRoutes = (isAuthorized: boolean): Route[] =>
  routesConfig.map(route => {
    if (route.private) {
      return {
        ...route,
        element: isAuthorized ? <PrivateLayout /> : <Navigate to={absolutePath(PATHS.LOGIN)} />,
      };
    }
    return route;
  });

export default getRoutes;
