export const PATHS = {
  HOME: {
    INDEX: "/",
  },
  LOGIN: "login",
  CART: {
    INDEX: "cart",
    ORDER_FORM: "order-form",
  },
} as const;

const ABSOLUTE_SYMBOL = "/";

export const absolutePath = (path: string): string => `/${path}`;

export const nestedRoute = (...routes: string[]): string => routes.join("/");

export const pathWithParams = (
  ...params: Array<string | number | null | undefined>
) =>
  ABSOLUTE_SYMBOL +
  params
    .filter((p) => {
      if (!p) {
        console.warn(`param is ${p}`);
        return false;
      }

      return true;
    })
    .join(ABSOLUTE_SYMBOL);
