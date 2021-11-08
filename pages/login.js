import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import Layout from '../components/Layout';

export default function Login() {
  // const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const router = useRouter();
  return (
    <Layout>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });
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
        {/* <label>
          Email:
          <input
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </label> */}
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
