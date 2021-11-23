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
  console.log('props.events: ', props.events);
  return (
    <div css={homePage}>
      <Layout userType={props.userType}>
        <Head>
          <title>Home Page</title>
        </Head>
        {props.events.map((eve) => (
          <Link
            href={`http://localhost:3000/events/${eve.eventLink}`}
            key={`event-${eve.id}`}
          >
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
  const { getRoleByToken, getEvents } = await import('../util/database');
  const sessionToken = context.req.cookies.sessionToken;
  const userType = await getRoleByToken(sessionToken);
  console.log('userType in gSSP index: ', userType);

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
        events: events,
      },
    };
  }
}
