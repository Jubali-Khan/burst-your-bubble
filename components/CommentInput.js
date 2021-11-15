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
  const [userId, setUserId] = useState(props.userInfo.id || 0);
  const [userName, setUserName] = useState(props.userName || '');

  const [verbChoice, setVerbChoice] = useState();
  const [argument, setArgument] = useState();
  const [conjChoice, setConjChoice] = useState('');
  const [premise, setPremise] = useState('');

  const [display, setDisplay] = useState('none');
  const [eventId, setEventId] = useState(props.event.id);

  async function postingHandler() {
    const response = await fetch('http://localhost:3000/api/comments/create', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        userName: userName,
        verbChoice: verbChoice,
        argument: argument,
        conjChoice: conjChoice,
        premise: premise,
        eventId: eventId,
      }),
    });
    const createdComment = await response.json();
    console.log('createdComment: ', createdComment);
  }

  return (
    <div css={divStyle}>
      <section css={rowStyle}>
        <Image src={'/../public/favicon.ico'} height="25px" width="25px" />
        <span>I</span>
        <span>
          <select
            value={verbChoice}
            onChange={(e) => {
              setVerbChoice(e.currentTarget.value);
            }}
          >
            <option value="believe">believe</option>
            <option value="think">think</option>
            <option value="agree that">agree that</option>
            <option value="agree with">agree with</option>
            <option value="disagree that">disagree that</option>
            <option value="disagree with">disagree with</option>
          </select>
        </span>
        <span>
          <input
            value={argument}
            onChange={(e) => setArgument(e.currentTarget.value)}
          />
        </span>
        <button className="add" onClick={() => setDisplay('block')}>
          +
        </button>
        <button className="post" onClick={postingHandler}>
          &#8617;
        </button>
      </section>
      <section id="extraInput" style={{ display: `${display}` }}>
        <div>
          <select
            value={conjChoice}
            onChange={(e) => setConjChoice(e.currentTarget.value)}
          >
            <option value="because">because</option>
            <option value="considering">considering</option>
            <option value="as">as</option>
            <option value="due to">due to</option>
            <option value="since">since</option>
          </select>
        </div>
        <div>
          <input
            value={premise}
            onChange={(e) => setPremise(e.currentTarget.value)}
          />
        </div>
      </section>
    </div>
  );
}
