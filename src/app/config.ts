export const domain = 'localhost:5181';
export const baseURL = `http://${domain}/api/v1`;
export const disallowedRoutes = [
  `${baseURL}/auth/login`,
  `${baseURL}/auth/register`,
  `${baseURL}/auth/refreshToken`,
];
