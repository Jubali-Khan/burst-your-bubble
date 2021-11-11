import Layout from '../components/Layout';

export default function Guide(props) {
  return (
    <Layout userType={props.userType}>
      <h1>Guide</h1>
      <p>guide</p>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getRoleByToken } = await import('../util/database');
  const sessionToken = context.req.cookies.sessionToken;
  const userType = await getRoleByToken(sessionToken);
  console.log('userType in gSSP index: ', userType);

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
