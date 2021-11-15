import { css } from '@emotion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const divStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  max-height: 20vh;

  border: 1px solid black;
  border-radius: 10px;

  #extraInput {
    display: none;
  }

  span {
    margin: 0.5%;
  }

  .add {
    margin: 0.5%;
    border-radius: 50%;

    :hover {
      background-color: lightgray;
    }
  }
  .post {
    margin: 0.5%;

    :hover {
      background-color: lightgray;
    }
  }
`;
const rowStyle = css`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`;

export default function CommentInput(props) {
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();

  const [verbChoice, setVerbChoice] = useState();
  const [argument, setArgument] = useState();
  const [conjChoice, setConjChoice] = useState('');
  const [premise, setPremise] = useState('');

  const [eventId, setEventId] = useState(); // N
  return (
    <div css={divStyle}>
      <section css={rowStyle}>
        <Image src={'/../public/favicon.ico'} height="25px" width="25px" />
        <span>I</span>
        <span>
          <select>
            <option>believe</option>
            <option>think</option>
            <option>agree that</option>
            <option>agree with</option>
            <option>disagree that</option>
            <option>disagree with</option>
          </select>
        </span>
        <span>
          <input />
        </span>
        <button className="add">+</button>
        <button className="post">&#8617;</button>
      </section>
      <section id="extraInput">
        <div>
          <select>
            <option>because</option>
            <option>considering</option>
            <option>as</option>
            <option>due to</option>
            <option>since</option>
          </select>
        </div>
        <div>
          <input />
        </div>
      </section>
    </div>
  );
}
