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
  const eventTitle = context.query.eventTitle.replaceAll('_', ' ');
  console.log('eventTitle: ', eventTitle);
  //   // get the event info from the database
  //   // 1. event title, authors, links from events table
  //   // 2. corresponding articles from articles table
  //   // 3. corresponding comments from comments table
  // check role and update header accordingly
  const { getRoleByToken } = await import('../../util/database');
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
