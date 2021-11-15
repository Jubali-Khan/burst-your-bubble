import { serialize } from 'cookie';

// Seshs related

export function createSTC(token) {
  // first check if we're in production, because of secure cookies..
  const isProduction = process.env.NODE_ENV === 'production';

  // Save the token in a cookie on the user's machine
  // (cookies get sent automatically to the server every time
  // a user makes a request)
  const maxAge = 60 * 200; // 200 minutes

  return serialize('sessionToken', token, {
    maxAge: maxAge,
    expires: new Date(Date().now + maxAge * 1000),
    httpOnly: true,
    secure: isProduction,
    path: '/',
    sameSite: 'lax',
  });
}
