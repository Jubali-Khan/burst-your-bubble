import { useState } from 'react';
import Layout from '../components/Layout';

export default function Login() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Layout>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
        }}
      >
        <label>
          Email:
          <input
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </label>
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
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </label>
        <button type="submit">log in</button>
      </form>
    </Layout>
  );
}
