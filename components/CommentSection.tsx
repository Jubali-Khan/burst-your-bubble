import { css } from '@emotion/react';
import Link from 'next/link';
import { useState } from 'react';
import CommentInput from './CommentInput';
import NewOpinionComment from './NewOpinionComment';

const containerStyles = css`
  border: 1px solid grey;
  border-radius: 10px;
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  margin: 1% 6.1%;
  padding: 1%;
`;

type EventType = {
  id: number;
  eventTitle: string;
  leftLogo: string;
  leftLink: string;
  leftHeadline: string;
  leftAuthorS: string;
  rightLogo: string;
  rightLink: string;
  rightHeadline: string;
  rightAuthorS: string;
  eventLink: string;
};
type Comment = {
  id: number;
  userId: number;
  userName: string;
  verbChoice: string;
  argument: string;
  conjChoice?: string;
  premise?: string;
  eventId: number;
};
type UserInfo = {
  id: number;
  userName: string;
  userId: number;
};
type Props = {
  userType: string | undefined;
  userInfo: UserInfo | undefined;
  event: EventType;
  eventTitle: string;
  comments: Comment[];
  textSize: string;
};
type Err = {
  message?: string;
}[];
export default function CommentSection(props: Props) {
  const [messages, setMessages] = useState<Err>([]);
  const [comments, setComments] = useState(props.comments);
  // console.log('comments SV: ', comments);
  const returnToLink = `/loginOrRegister?returnTo=events/${props.eventTitle}`;
  return (
    <>
      <div>
        {messages.map((err) => (
          <span key={err.message}>{err.message}</span>
        ))}
      </div>
      <div css={containerStyles} style={{ fontSize: props.textSize }}>
        {comments.map((comment) => (
          <NewOpinionComment
            userType={props.userType}
            userInfo={props.userInfo}
            setMessages={setMessages}
            key={comment.id}
            comment={comment}
            eventTitle={props.eventTitle}
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
            Please <Link href={returnToLink}>login or register</Link> to leave a
            comment
          </div>
        )}
      </div>
      <br />
    </>
  );
}
