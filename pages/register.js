import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import Layout from '../components/Layout';

export default function Register() {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const router = useRouter();
  return (
    <Layout>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await fetch(
            'http://localhost:3000/api/auth/register',
            {
              method: 'POST',
              headers: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify({
                username: userName,
                useremail: userEmail,
                password: password,
              }),
            },
          );
          const regJSON = await response.json();

          if ('errors' in regJSON) {
            setErrors(regJSON.errors);
            return;
          }

          router.push('/login');
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
          Username:
          <input
            value={userName}
            onChange={(e) => setUserName(e.currentTarget.value)}
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
        <button>register</button>
      </form>
      <div>
        {errors.map((error) => (
          <div key={`err-msg-${error.message}`}>{error.message}</div>
        ))}
      </div>
    </Layout>
  );
}
