export default function Logout() {
  return 'Logged out';
}

export async function getServerSideProps(context) {
  console.log('gSSP in logout');
  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/logout`,
        permanent: true,
      },
    };
  }
  const { serialize } = await import('cookie');

  // get the token from the browser:
  const sessionToken = context.req.cookies.sessionToken;

  // if there is, delete it
  if (sessionToken) {
    // delete it from the DB
    await fetch(`${process.env.BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        sessionToken: sessionToken,
      }),
    });

    // delete it from the browser
    context.res.setHeader(
      'Set-Cookie',
      serialize('sessionToken', '', {
        maxAge: -1,
        path: '/',
      }),
    );
  }

  console.log('redirecting home from logout page');
  // finally, redirect home
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}
