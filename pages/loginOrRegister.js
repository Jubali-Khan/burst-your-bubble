import { css } from '@emotion/react';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';

const formStyles = css`
  border: 1px solid white;
  border-radius: 15px;
  padding: 1% 2% 2% 2%;
  margin: 3% 41%;

  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: #c5ccd5;
  text-align: center;

  div {
    margin: 5% auto;
  }

  input {
    margin: 0.5%;
    border: 1px solid grey;
    border-radius: 5px;

    width: 200px;
    height: 25px;
  }

  button {
    background-color: white;
    border: 1px solid white;
    border-radius: 5px;

    :hover {
      background-color: #c5d0d5;
    }
  }
  .loginB {
    margin-top: 10%;
    margin-bottom: 5%;
    width: 150px;
    height: 25px;
  }
  .registerB {
    margin-top: 5%;
    width: 150px;
    height: 25px;
  }
`;

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
    const destination =
      typeof router.query.returnTo === 'string' && router.query.returnTo
        ? router.query.returnTo
        : `/`;
    router.push(destination); // redirect to profile
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
      <Head>
        <title>Login or Register</title>
      </Head>
      <form
        css={formStyles}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div>
          <div
            style={{
              border: '1px solid white',
              borderRadius: '5px',
              padding: '4%',
              display: displaySV,
            }}
          >
            {errors.length > 1
              ? errors.map((error) => (
                  <div key={`err-msg-${error.message}`}>{error.message}</div>
                ))
              : 'Please add a username too!'}
          </div>
          <label>
            Email:
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.currentTarget.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </label>
        </div>
        <section style={{ display: displaySV }}>
          <label>
            Username:
            <input
              style={{
                margin: '0.5%',
                border: '1px solid grey',
                borderRadius: '5px',
                height: '25px',
                width: '200px',
              }}
              value={userName}
              onChange={(e) => setUserName(e.currentTarget.value)}
            />
          </label>
        </section>
        <button className="loginB" onClick={() => loginHandler()}>
          login
        </button>

        <button className="registerB" onClick={() => registerHandler()}>
          register
        </button>
      </form>
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
