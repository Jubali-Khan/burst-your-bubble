import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <Layout>
        <Head>
          <title>Home Page</title>
        </Head>
      </Layout>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const { isAdminSession } = await import('../util/database');
//   const sessionToken = context.req.cookies.sessionToken;
//   const adminSession = await isAdminSession(sessionToken);

//   console.log('adminSession in index: ', adminSession);
//   // console.log('adminSession.role in index: ', adminSession.role);
//   return {
//     props: {},
//   };
// }
