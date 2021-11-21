import { css } from '@emotion/react';
import Link from 'next/link';
import { useState } from 'react';
import CommentInput from './CommentInput';
import OpinionComment from './OpinionComment';

export default function CommentSection(props) {
  const [messages, setMessages] = useState([]);

  const containerStyles = css`
    border: 1px solid grey;
    border-radius: 10px;
    background-color: #faf9f4;

    font-size: ${props.textSize};

    margin: 1% 6.1%;
    padding: 1%;
  `;

  return (
    <>
      <div>
        {messages.map((err) => (
          <span key={`${err.message}`}>{err.message}</span>
        ))}
      </div>
      <div css={containerStyles}>
        {props.comments.map((comment) => (
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
          />
        ) : (
          <span>
            Please <Link href="/loginOrRegister">login or register</Link> to
            leave a comment
          </span>
        )}
      </div>
    </>
  );
}
