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
  const userId = props.userInfo.id;
  const userName = props.userInfo.userName;
  const eventId = props.event.id;

  const [verbChoice, setVerbChoice] = useState('believe');
  const [argument, setArgument] = useState('');

  const [toggle, setToggle] = useState(false);
  const [conjChoice, setConjChoice] = useState('because');
  const [premise, setPremise] = useState('');

  const [errors, setErrors] = useState([]);

  let display = 'none';
  if (!toggle) {
    display = 'none';
  } else if (toggle) {
    display = 'block';
  }

  async function postingHandler() {
    const response = await fetch(
      'http://localhost:3000/api/comments/createComment',
      {
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
          toggle: toggle,
        }),
      },
    );
    const createdComment = await response.json();
    console.log('createdComment: ', createdComment);

    if ('errors' in createdComment) {
      setErrors(createdComment.errors);
      return;
    }
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
            <option value="agree">agree</option>
            <option value="disagree">disagree</option>
          </select>
        </span>
        <span>
          <input
            value={argument}
            onChange={(e) => setArgument(e.currentTarget.value)}
          />
        </span>
        <button
          className="add"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          +
        </button>
        <button className="post" onClick={postingHandler}>
          &#8617;
        </button>
        <span>
          {errors.map((err) => (
            <p key={`${err.message}`}>{err.message}</p>
          ))}
        </span>
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
