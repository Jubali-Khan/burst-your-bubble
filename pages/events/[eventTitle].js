import { useState } from 'react';
import Articles from '../../components/Articles';
import CommentSection from '../../components/CommentSection';
import Event from '../../components/Event';
import Layout from '../../components/Layout';

export default function EventPage() {
  const [eventErrors, setEventErrors] = useState();
  const [articlesErrors, setArticlesErrors] = useState();
  const [commentsErrors, setCommentsErrors] = useState();
  return (
    <Layout>
      <Event />
      <Articles />
      <CommentSection />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getRoleByToken } = await import('../../util/database');
  const eventTitle = context.query.eventTitle.replaceAll('_', ' ');
  // console.log('eventTitle: ', eventTitle);

  const eventResponse = await fetch('http://localhost:3000/api/event/getInfo', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      eventTitle: eventTitle,
    }),
  });

  const event = await eventResponse.json();
  console.log('event in gSSP in [eventTitle]: ', event);
  // if event isn't bringing right data ..?

  const articlesResponse = await fetch(
    'http://localhost:3000/api/event/getArticles',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        eventId: event.id,
      }),
    },
  );
  const articles = await articlesResponse.json();
  console.log('articles in gSSP in [eventTitle]: ', articles);
  // if articles dont exist, show proper message on page or redirect

  const commentsResponse = await fetch(
    'http://localhost:3000/api/event/getComments',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        eventId: event.id,
      }),
    },
  );
  const comments = await commentsResponse.json();
  console.log('comments in gSSP in [eventTitle]: ', comments);
  // No comments? no opinionComments!

  // check role and update header accordingly

  const sessionToken = context.req.cookies.sessionToken;
  const userType = await getRoleByToken(sessionToken);
  console.log('userType in gSSP [eventTitle]: ', userType);

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
