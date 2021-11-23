import { css } from '@emotion/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CommentInput from './CommentInput';
import OpinionComment from './OpinionComment';

const containerStyles = css`
  border: 1px solid grey;
  border-radius: 10px;
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  margin: 1% 6.1%;
  padding: 1%;
`;

export default function CommentSection(props) {
  const [messages, setMessages] = useState([]);
  const [comments, setComments] = useState(props.comments);
  console.log('comments SV: ', comments);

  return (
    <>
      <div>
        {messages.map((err) => (
          <span key={`${err.message}`}>{err.message}</span>
        ))}
      </div>
      <div css={containerStyles} style={{ fontSize: `${props.textSize}` }}>
        {comments.map((comment) => (
          <OpinionComment
            userType={props.userType}
            userInfo={props.userInfo}
            setMessages={setMessages}
            key={`${comment.id}`}
            comment={comment}
          />
        ))}

        {props.userInfo ? (
          <CommentInput
            userInfo={props.userInfo}
            event={props.event}
            setMessages={setMessages}
            comments={comments}
            setComments={setComments}
          />
        ) : (
          <div style={{ textAlign: 'center', marginTop: '1.5%' }}>
            Please{' '}
            <Link href={/loginOrRegister/returnTo=`${props.eventTitle}`}>login or register</Link> to
            leave a comment
          </div>
        )}
      </div>
    </>
  );
}
