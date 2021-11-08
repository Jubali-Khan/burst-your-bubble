import CreateEvent from '../../components/CreateEvent';
import Layout from '../../components/Layout';

export default function Create() {
  return (
    <Layout>
      <h1>Create an event</h1>
      <CreateEvent />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // is admin?
  const { isAdminSession } = await import('../../util/database');

  // No session to begin with?
  const sessionToken = context.req.cookies.sessionToken;
  console.log('sessionToken in gSSP in create', sessionToken);

  if (typeof sessionToken === 'undefined') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  //

  const adminSession = await isAdminSession(sessionToken);

  console.log('adminSession in gSSP create: ', adminSession);
  console.log('typeof adminSession in gSSP create: ', typeof adminSession);

  // Not an admin adminSession?
  if (typeof adminSession === 'undefined') {
    return {
      redirect: {
        destination: '/logout',
        permanent: false,
      },
    };
  }
  //

  return {
    props: {},
  };
}
