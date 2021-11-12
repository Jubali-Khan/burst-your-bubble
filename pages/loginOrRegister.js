import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import Layout from '../components/Layout';

export default function LoginOrReg() {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [displaySV, setDisplaySV] = useState('none');

  const [errors, setErrors] = useState([]);

  const router = useRouter();

  async function loginHandler() {
    console.log('in loginHandler');
    const response = await fetch('http://localhost:3000/api/auth/login2', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        useremail: userEmail,
        password: password,
      }),
    });
    const loginJSON = await response.json();

    if ('errors' in loginJSON) {
      setErrors(loginJSON.errors);
      return;
    }

    router.push('/'); // redirect to profile
  }
  async function registerHandler() {
    if (displaySV === 'none') {
      setDisplaySV('block');
      return;
    }
    console.log('in registerHandler');
    const response = await fetch('http://localhost:3000/api/auth/register2', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        useremail: userEmail,
        username: userName,
        password: password,
      }),
    });
    const regJSON = await response.json();

    if ('errors' in regJSON) {
      setErrors(regJSON.errors);
      return;
    }

    router.push('/'); // redirect to profile
  }
  return (
    <Layout>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          // login
          // register
          // no
        }}
      >
        <label>
          Email:
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.currentTarget.value)}
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
        <button onClick={() => loginHandler()}>login</button>
        <br />
        <button onClick={() => registerHandler()}>register</button>
        <section style={{ display: displaySV }}>
          <hr />
          Please add a username too!
          <br />
          <label>
            Username:
            <input
              value={userName}
              onChange={(e) => setUserName(e.currentTarget.value)}
            />
          </label>
        </section>
      </form>
      <div>
        {errors.map((error) => (
          <div key={`err-msg-${error.message}`}>{error.message}</div>
        ))}
      </div>
    </Layout>
  );
}

// This is used to redirect to another page because you already have a valid session, otherwise it won't stop you from accessing /register
export async function getServerSideProps(context) {
  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/loginOrRegister`,
        permanent: true,
      },
    };
  }

  const { isSessionValid } = await import('../util/database');

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
