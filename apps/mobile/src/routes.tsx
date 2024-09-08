const auth: string = '/auth';

export const appRoutes = {
  root: '/',
  
  signin: `${auth}/signin`,
  signup: `${auth}/signup`,
  signout: `${auth}/signout`,

  welcome: "/welcome",
  showroom: "/showroom",
  community: "/community",
  podcasts: "/podcasts",
  debug: "/debug",
  profile: "/profile",
  settings: "/settings",
  notFound: "/404",
};