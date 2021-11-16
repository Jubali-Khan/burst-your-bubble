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
      {/* CommentSection:
      1. looping over the opinion comments
      2. showing commentInput */}
      {/* <li>
          <OpinionComment />
        </li> */}
      {props.userInfo ? (
        <CommentInput userInfo={props.userInfo} event={props.event} />
      ) : (
        <span>Please sign up to leave a comment</span>
      )}
    </div>
  );
}
