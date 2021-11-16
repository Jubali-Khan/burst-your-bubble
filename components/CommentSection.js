import { css } from '@emotion/react';
import CommentInput from './CommentInput';
import OpinionComment from './OpinionComment';

export default function CommentSection(props) {
  const containerStyles = css`
    border: 1px solid grey;
    border-radius: 10px;
    background-color: #faf9f4;

    font-size: ${props.textSize};

    margin: 1% 6.1%;
    padding: 1%;
  `;

  return (
    <div css={containerStyles}>
      {props.comments.map((comment) => (
        <OpinionComment
          key={`${comment.id}`}
          comment={comment}
          userInfo={props.userInfo}
        />
      ))}

      {props.userInfo ? (
        <CommentInput userInfo={props.userInfo} event={props.event} />
      ) : (
        <span>Please sign up to leave a comment</span>
      )}
    </div>
  );
}
