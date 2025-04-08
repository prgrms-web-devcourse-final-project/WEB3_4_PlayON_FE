export const USER_ROUTE = Object.freeze({
  login: '/login',
  signup: '/signup',
  signup_userdata: '/signup/userdata',
  my_page: '/user/me',
  user_page: (input: string) => `/user/${input}`,
});
