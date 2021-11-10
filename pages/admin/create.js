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

  // No session?
  const sessionToken = context.req.cookies.sessionToken;
  console.log('sessionToken in gSSP in create', sessionToken);

  if (!sessionToken) {
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
  // console.log('adminSession.role in gSSP create: ', adminSession.role);

  // Not an admin adminSession?
  if (!adminSession) {
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

/*
export async function getServerSideProps(context) {
  // Add header session checker:
  // is there a session?
  // yes: is it admin or user?
  // admin: send info (admin) over Layout to Header
  // user: send info (user) over Layout to Header
  // no: just browsin', basic header
  const session = await getSessionAndRole(context.req.cookies.sessionToken);
  console.log('session in _app: ', session);
  if (!session) {
    return {
      props: {
        session: 'browser',
      },
    };
  }
  return {
    props: {},
  };
}
*/
