export const USER_ROUTE = Object.freeze({
  login: '/login',
  signup: '/signup',
  signup_userdata: '/signup/userdata',
  my_page: '/user/me',
  user_page: (userId: string) => `/user/${userId}`,
});
