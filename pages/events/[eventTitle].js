import { css } from '@emotion/react';
import { useState } from 'react';
import Articles from '../../components/Articles';
import CommentSection from '../../components/CommentSection';
import Event from '../../components/Event';
import Layout from '../../components/Layout';

// need container styles
const divStyle = css`
  margin: 2%;
`;

export default function EventPage(props) {
  const [eventErrors, setEventErrors] = useState();
  const [articlesErrors, setArticlesErrors] = useState();
  const [commentsErrors, setCommentsErrors] = useState();
  const [textSize, setTextSize] = useState('100%');
  const [counter, setCounter] = useState(0);

  function textSizeIncrease() {
    if (counter > 5) {
      return;
    } else {
      let tempValue = textSize;
      // console.log('tempValue: ', tempValue);
      tempValue = tempValue.slice(0, -1);
      // console.log('tempValue: ', tempValue);
      tempValue = Number(tempValue);
      // console.log('tempValue: ', tempValue);
      tempValue = tempValue + 10;
      // console.log('tempValue: ', tempValue);
      tempValue = tempValue.toString();
      // console.log('tempValue: ', tempValue);
      tempValue = tempValue.concat('%');
      console.log('tempValue: ', tempValue);
      setTextSize(tempValue);
      setCounter(counter + 1);
    }
  }
  function textSizeDecrease() {
    if (counter <= -4) {
      return;
    } else {
      let tempValue = textSize;
      // console.log('tempValue: ', tempValue);
      tempValue = tempValue.slice(0, -1);
      // console.log('tempValue: ', tempValue);
      tempValue = Number(tempValue);
      // console.log('tempValue: ', tempValue);
      tempValue = tempValue - 10;
      // console.log('tempValue: ', tempValue);
      tempValue = tempValue.toString();
      // console.log('tempValue: ', tempValue);
      tempValue = tempValue.concat('%');
      console.log('tempValue: ', tempValue);
      setTextSize(tempValue);
      setCounter(counter - 1);
    }
  }
  return (
    <Layout userType={props.userType}>
      <div css={divStyle}>
        <Event
          event={props.event}
          textSize={textSize}
          setTextSize={setTextSize}
          counter={counter}
          setCounter={setCounter}
        />
        <Articles
          articles={props.articles}
          textSize={textSize}
          setTextSize={setTextSize}
          counter={counter}
          setCounter={setCounter}
        />
        <CommentSection
          userInfo={props.userInfo}
          event={props.event}
          textSize={textSize}
          setTextSize={setTextSize}
          counter={counter}
          setCounter={setCounter}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getRoleByToken, getUserinfoByToken } = await import(
    '../../util/database'
  );
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

  //
  // check role and update header accordingly
  const sessionToken = context.req.cookies.sessionToken;
  const userType = await getRoleByToken(sessionToken);
  console.log('userType in gSSP [eventTitle]: ', userType);

  if (!userType) {
    // someone just browing, not admin nor user
    return {
      props: {
        event: event,
        articles: articles,
        comments: comments,
      },
    };
  }

  if (userType.role === 1) {
    return {
      props: {
        userType: 'admin',
        event: event,
        articles: articles,
        comments: comments,
      },
    };
  }

  const userInfo = await getUserinfoByToken(sessionToken);
  console.log('userInfo in gSSP [eventTitle]: ', userInfo);

  if (userType.role === 2) {
    return {
      props: {
        userType: 'user',
        userInfo: userInfo,
        event: event,
        articles: articles,
        comments: comments,
      },
    };
  }
}
