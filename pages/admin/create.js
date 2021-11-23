import Head from 'next/head';
import { useEffect, useState } from 'react';
import CreateEvent from '../../components/CreateEvent';
import Layout from '../../components/Layout';

export default function Create(props) {
  const [errors, setErrors] = useState([]);
  const [refresher, setRefresher] = useState(false);
  function refreshPage() {
    // useRouter is an alternative
    window.location.reload();
  }

  return (
    <Layout userType={props.userType}>
      <Head>
        <title>Create Event Page</title>
      </Head>
      <h1>Create an event</h1>
      <div>
        {useEffect(() => refreshPage, [refresher])}
        {errors &&
          errors.map((error) => (
            <li key={`mess-${error.message}`}>{error.message}</li>
          ))}
      </div>
      <CreateEvent setErrors={setErrors} setRefresher={setRefresher} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  //
  // is admin?
  const { getRoleByToken } = await import('../../util/database');

  const sessionToken = context.req.cookies.sessionToken;
  console.log('sessionToken in gSSP in create', sessionToken);

  const userType = await getRoleByToken(sessionToken);
  console.log('userType in gSSP create: ', userType);

  if (!userType) {
    return {
      redirect: {
        destination: '/loginOrRegister', // still needs a returnTo
        permanent: false,
      },
    };
  }

  if (userType.role === 1) {
    return {
      props: {
        userType: 'admin',
      },
    };
  }

  if (userType.role === 2) {
    return {
      redirect: {
        destination: '/logout',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
