import { RouteType } from './route';
import { USER_ROUTE } from './user';

export const PATH: RouteType = Object.freeze({
  main: '/',
  ...USER_ROUTE,
});
