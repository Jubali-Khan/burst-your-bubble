import Layout from '../components/Layout';

export default function Guide() {
  return (
    <Layout>
      <h1>Guide</h1>
      <p>guide</p>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getSessionAndRole } = await import('../util/database');
  const sessionToken = context.req.cookies.sessionToken;
  const userType = await getSessionAndRole(sessionToken);
  console.log('userType in gSSP guide: ', userType);

  if (!userType) {
    // someone just browing, not admin nor user
    return {
      props: {},
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
      props: {
        userType: 'user',
      },
    };
  }
}
