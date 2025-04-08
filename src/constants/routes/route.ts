export type RouteType = {
  [key: string]: string | ((input: string[]) => string);
};
