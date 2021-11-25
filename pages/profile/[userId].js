import { css } from '@emotion/react';
import { useRouter } from 'next/dist/client/router';
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
  const router = useRouter();
  const [events, setEvents] = useState(props.events || []);
  const [updateToggle, setUpdateToggle] = useState(false);

  const [email, setEmail] = useState(props.userInfo.userEmail);
  const [userName, setUserName] = useState(props.userInfo.userName);
  const [message, setMessage] = useState([]);

  async function doneHandler() {
    const response = await fetch(`/api/profiles/update`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        userName: userName,
        userId: props.userInfo.userId,
      }),
    });
    if (response.status === 403) {
      router.push(`loginOrRegister?returnTo=profile/${props.userInfo.userId}`);
      return;
    }
    if (response.status === 405) {
      setMessage('not enough info was provided');
      return;
    }
    if (response.status === 200) {
      setUpdateToggle(false);
      return;
    }
  }
  return (
    <Layout userType={props.userType} userInfo={props.userInfo}>
      <form
        css={formStyles}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        {updateToggle ? (
          <>
            <div>
              {message.length > 1 ? (
                <div
                  key={`err-msg-${message}`}
                  style={{
                    border: '1px solid white',
                    borderRadius: '5px',
                    padding: '4%',
                  }}
                >
                  <div>{message}</div>
                </div>
              ) : (
                ''
              )}
            </div>
            <section>
              <label>
                Email:
                <input
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  placeholder={email}
                />
              </label>
              <label>
                Username:
                <input
                  value={userName}
                  onChange={(e) => setUserName(e.currentTarget.value)}
                  placeholder={userName}
                />
              </label>
              <button
                className="updateB"
                onClick={() => {
                  setUpdateToggle(false);
                  setEmail(props.userInfo.userEmail);
                  setUserName(props.userInfo.userName);
                  setMessage('');
                }}
              >
                CANCEL
              </button>
              <button onClick={doneHandler} className="updateB">
                DONE
              </button>
            </section>
          </>
        ) : (
          <>
            <div></div>
            <section>
              <label>
                Email:
                <input disabled placeholder={email} />
              </label>
              <label>
                Username:
                <input disabled placeholder={userName} />
              </label>
              <button
                className="updateB"
                onClick={() => {
                  setUpdateToggle(true);
                }}
              >
                UPDATE
              </button>
            </section>
          </>
        )}
      </form>{' '}
      <hr />
      <div>
        <h2>Posts you've contributed to:</h2>
        {events.length >= 1
          ? events.map((event) => (
              <Link
                href={`/events/${event.eventLink}`}
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
  const { getRoleByToken, getEventsByUserID, getUserinfoByToken } =
    await import('../../util/database');

  const sessionToken = context.req.cookies.sessionToken;
  const userType = await getRoleByToken(sessionToken);
  console.log('userType in gSSP [userId]: ', userType);
  console.log('context.query.userId in gSSP [userId]: ', context.query.userId);

  const userId = context.query.userId;

  const userInfo = await getUserinfoByToken(sessionToken);
  console.log('userInfo in gSSP [userId]: ', userInfo);

  if (!userType) {
    return {
      redirect: {
        destination: '/loginOrRegister',
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
        userInfo: userInfo,
        events: events,
      },
    };
  }
}
