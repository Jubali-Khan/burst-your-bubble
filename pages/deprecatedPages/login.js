import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import Layout from '../../components/Layout';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const router = useRouter();
  return (
    <Layout>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await fetch(
            `${process.env.BASE_URL}/api/auth/login`,
            {
              method: 'POST',
              headers: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify({
                username: username,
                password: password,
              }),
            },
          );
          const loginJSON = await response.json();

          if ('errors' in loginJSON) {
            setErrors(loginJSON.errors);
            return;
          }
          // router part (only FE)
          // where could/should the returnTo be implemented on a page and how?
          // const destination =
          //   typeof router.query.returnTo === 'string' && router.query.returnTo
          //     ? router.query.returnTo
          //     : `/users/${loginJSON.user.id}`;

          router.push('/');
        }}
      >
        <br />
        <label>
          Username:
          <input
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </label>
        <button>log in</button>
      </form>
      <div>
        {errors.map((error) => (
          <div key={`err-msg-${error.message}`}>{error.message}</div>
        ))}
      </div>
    </Layout>
  );
}

// This is used to redirect to another page because you already have a valid session, otherwise it won't stop you from accessing /login
export async function getServerSideProps(context) {
  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/login`,
        permanent: true,
      },
    };
  }

  const { isSessionValid } = await import('../../util/database');

  const sessionToken = context.req.cookies.sessionToken;
  const session = await isSessionValid(sessionToken);

  // redirecting part!
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
