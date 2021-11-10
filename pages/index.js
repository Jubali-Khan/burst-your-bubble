import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function Home(props) {
  return (
    <div>
      <Layout userType={props.userType}>
        <Head>
          <title>Home Page</title>
        </Head>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { getSessionAndRole } = await import('../util/database');
  const sessionToken = context.req.cookies.sessionToken;
  const userType = await getSessionAndRole(sessionToken);
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
