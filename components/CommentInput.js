import { css } from '@emotion/react';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { useState } from 'react';

const divStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;

  max-height: 20vh;
  background-color: white;
  padding: 1%;
  margin: 2% 0.5% 0.5% 0.5%;

  border: 1px solid grey;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  span {
    margin: 0.5%;
  }

  select {
    margin: 0.5%;
    border: 1px solid grey;
    border-radius: 5px;

    width: 20%;
    height: 25px;
  }
  input {
    margin: 0.5%;
    border: 1px solid grey;
    border-radius: 5px;

    width: 30%;
    height: 21px;
  }

  .add {
    width: 100px;
    height: 25px;
    padding: 0.4%;
    background-color: white;
    border: 1px solid grey;
    border-radius: 5px;

    :hover {
      background-color: lightgray;
    }
  }
  .post {
    margin: 0.5%;
    width: 100px;
    height: 25px;
    padding: 0.4%;
    background-color: white;
    border: 1px solid grey;
    border-radius: 5px;

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
  const router = useRouter();
  const returnToLink = `/loginOrRegister?returnTo=events/${props.eventTitle}`;
  const userId = props.userInfo.id;
  const userName = props.userInfo.userName;
  const eventId = props.event.id;
  console.log('props.comments in CommentInput:', props.comments);

  const [verbChoice, setVerbChoice] = useState('believes');
  const [argument, setArgument] = useState('');

  const [toggle, setToggle] = useState(false);
  const [conjChoice, setConjChoice] = useState('because');
  const [premise, setPremise] = useState('');

  let display = 'none';
  if (!toggle) {
    display = 'none';
  } else if (toggle) {
    display = 'block';
  }
  function redirectToLoginOrReg() {
    router.push(returnToLink);
    return;
  }

  async function postingHandler() {
    const response = await fetch(`/api/comments/createComment`, {
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
    });
    if (response.status === 403) {
      redirectToLoginOrReg();
      return;
    }
    const createdComment = await response.json();
    console.log('createdComment: ', createdComment);

    if ('errors' in createdComment) {
      props.setMessages(createdComment.errors);
      return;
    } else {
      props.setComments([...props.comments, createdComment]);
    }
  }

  return (
    <div css={divStyle}>
      <form css={rowStyle} onSubmit={(e) => e.preventDefault()}>
        <span>I</span>
        <select
          value={verbChoice}
          onChange={(e) => {
            setVerbChoice(e.currentTarget.value);
          }}
        >
          <option value="believes">believe</option>
          <option value="thinks">think</option>
          <option value="agrees">agree</option>
          <option value="disagrees">disagree</option>
        </select>

        <input
          value={argument}
          onChange={(e) => setArgument(e.currentTarget.value)}
        />

        <select
          style={{ display: `${display}` }}
          value={conjChoice}
          onChange={(e) => setConjChoice(e.currentTarget.value)}
        >
          <option value="because">because</option>
          <option value="considering">considering</option>
          <option value="as">as</option>
          <option value="due to">due to</option>
          <option value="since">since</option>
        </select>
        <input
          style={{ display: `${display}` }}
          value={premise}
          onChange={(e) => setPremise(e.currentTarget.value)}
        />

        <button
          className="add"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          {display === 'none' ? '+PREMISE' : '-'}
        </button>

        <button className="post" onClick={postingHandler}>
          ENTER
        </button>
      </form>
    </div>
  );
}
