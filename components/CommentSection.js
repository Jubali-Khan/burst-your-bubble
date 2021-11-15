import { css } from '@emotion/react';
import CommentInput from './CommentInput';
import OpinionComment from './OpinionComment';

const containerStyles = css`
  border: 1px solid black;
  border-radius: 10px;

  margin: 1% 6.1%;
  padding: 1%;
`;

export default function CommentSection(props) {
  return (
    <div css={containerStyles}>
      {/* CommentSection:
      1. looping over the opinion comments
      2. showing commentInput */}
      {/* <li>
          <OpinionComment />
        </li> */}

      <CommentInput userInfo={props.userInfo} event={props.event} />
    </div>
  );
}
