import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import IndexEvent from '../components/IndexEvent';
import Layout from '../components/Layout';

const homePage = css`
  a {
    text-decoration: none;
    color: inherit;
  }
`;
export default function Home(props) {
  // console.log('props.events: ', props.events);
  return (
    <div css={homePage}>
      <Layout userType={props.userType} userInfo={props.userInfo}>
        <Head>
          <title>Home Page</title>
        </Head>
        {props.events.map((eve) => (
          <Link href={`/events/${eve.eventLink}`} key={`event-${eve.id}`}>
            <a>
              <IndexEvent event={eve} />
            </a>
          </Link>
        ))}
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { getRoleByToken, getEvents, getUserinfoByToken } = await import(
    '../util/database'
  );
  const sessionToken = context.req.cookies.sessionToken;
  const userType = await getRoleByToken(sessionToken);
  const userInfo = await getUserinfoByToken(sessionToken);
  // console.log('userType in gSSP index: ', userType);
  // console.log('userInfo in gSSP index: ', userInfo);

  const events = await getEvents();

  if (!userType) {
    // someone just browing, not admin nor user
    return {
      props: {
        events: events,
      },
    };
  }

  if (userType.role === 1) {
    return {
      props: {
        userType: 'admin',
        events: events,
      },
    };
  }

  if (userType.role === 2) {
    return {
      props: {
        userType: 'user',
        userInfo: userInfo,
        events: events,
      },
    };
  }
}
