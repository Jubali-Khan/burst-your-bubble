import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import IndexEvent from '../../components/IndexEvent';
import Layout from '../../components/Layout';

const formStyles = css`
  border: 1px solid white;
  border-radius: 15px;
  padding: 1% 2% 2% 2%;
  margin: 3% 41%;

  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: #c5ccd5;
  text-align: center;

  div {
    margin: 5% auto;
  }

  input {
    margin: 0.5%;
    border: 1px solid grey;
    border-radius: 5px;

    width: 200px;
    height: 25px;
  }

  button {
    background-color: white;
    border: 1px solid white;
    border-radius: 5px;

    :hover {
      background-color: #c5d0d5;
    }
  }
  .updateB {
    margin-top: 10%;
    margin-bottom: 5%;
    width: 150px;
    height: 25px;
  }
  .cancelB {
    margin-top: 5%;
    width: 150px;
    height: 25px;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;
export default function UserPage(props) {
  const [events, setEvents] = useState(props.events || []);
  return (
    <Layout>
      <form
        css={formStyles}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div>
          <div
            style={{
              border: '1px solid white',
              borderRadius: '5px',
              padding: '4%',
            }}
          >
            {/* {errors.length > 1
              ? errors.map((error) => (
                  <div key={`err-msg-${error.message}`}>{error.message}</div>
                ))
              : 'Please add a username too!'} */}
          </div>
          <label>
            Email:
            <input disabled />
          </label>
        </div>

        <section style={{ display: 'block' }}>
          <label>
            Username:
            <input
              style={{
                margin: '0.5%',
                border: '1px solid grey',
                borderRadius: '5px',
                height: '25px',
                width: '200px',
              }}
              disabled
            />
          </label>
        </section>
        {/* 1) update onclick -> done & cancel buttons
        done -> updates info and switches back to update
        cancel -> switches back to update  */}
        <button className="updateB">update</button>

        <button className="cancelB">cancel</button>
      </form>{' '}
      <hr />
      <div>
        <h2>Posts you've contributed to:</h2>
        {events.length >= 1
          ? events.map((event) => (
              <Link
                href={`http://localhost:3000/events/${event.eventLink}`}
                key={`event-${event.id}`}
              >
                <a
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  targer="_blank"
                >
                  <IndexEvent event={event} />
                </a>
              </Link>
            ))
          : 'None! Check out the home page for most recent topics/events!'}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getRoleByToken, getEventsByUserID } = await import(
    '../../util/database'
  );
  const sessionToken = context.req.cookies.sessionToken;
  const userType = await getRoleByToken(sessionToken);
  console.log('userType in gSSP [userId]: ', userType);
  console.log('context.query.userId in gSSP [userId]: ', context.query.userId);
  const userId = context.query.userId;

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
      redirect: {
        destination: '/logout',
        permanent: false,
      },
    };
  }
  const events = await getEventsByUserID(userId);
  console.log('events in gSSP [userId]', events);
  if (userType.role === 2) {
    if (userType.userId !== Number(context.query.userId)) {
      return {
        redirect: {
          destination: '/logout',
          permanent: false,
        },
      };
    }
    return {
      props: {
        userType: 'user',
        events: events,
      },
    };
  }
}
