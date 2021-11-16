import { css } from '@emotion/react';
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
  margin: 0.5%;

  border: 1px solid grey;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  span {
    margin: 0.5%;
  }

  select {
    margin: auto 0.5%;
  }
  input {
    margin: 0.5% 1.5%;
    width: 40%;
  }

  .add {
    margin: 0.5%;
    padding: 0.4%;
    font-size: small;
    border-radius: 5px;

    :hover {
      background-color: lightgray;
    }
  }
  .post {
    margin: 0.5%;
    padding: 0.4%;
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

const containerStyles = css`
  margin: 1%;
  padding: 0.5%;
  border: 1px solid grey;
  border-radius: 5px;
  background-color: #a3c9ff;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default function OpinionComment(props) {
  console.log('props.comment: ', props.comment);
  const [userName, setUserName] = useState(props.comment.userName);
  const [verbChoice, setVerbChoice] = useState(props.comment.verbChoice);
  const [argument, setArgument] = useState(props.comment.argument);

  const [toggle, setToggle] = useState(false);
  const [conjChoice, setConjChoice] = useState(props.comment.conjChoice);
  const [premise, setPremise] = useState(props.comment.premise);
  const [errors, setErrors] = useState([]);

  let display = 'none';
  if (!toggle) {
    display = 'none';
  } else if (toggle) {
    display = 'block';
  }
  async function updateHandler() {
    // ping an api route
    // in the route look for the comment
    // if the comment is there, update it with an update function
    // if the comment isn't there, send a message to refresh the event page
  }
  const [editToggle, setEditToggle] = useState(false);
  function editHandler() {
    setEditToggle(!editToggle);
  }
  if (editToggle === false) {
    return (
      // logged in: owner
      <div css={containerStyles}>
        {userName} {verbChoice} {argument} {premise !== '' ? conjChoice : ''}
        {premise !== '' ? premise : ''}
        <button onClick={editHandler}>EDIT</button>
      </div>
    );
  }
  if (editToggle === true) {
    return (
      <div css={divStyle}>
        <form css={rowStyle} onSubmit={(e) => e.preventDefault()}>
          <Image src={'/../public/favicon.ico'} height="25px" width="25px" />
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

          <button className="post">UPDATE</button>
          <button className="post" onClick={() => setEditToggle(false)}>
            CANCEL
          </button>
          <div>
            {errors.map((err) => (
              <p key={`${err.message}`}>{err.message}</p>
            ))}
          </div>
        </form>
      </div>
    );
  }
}
/*

*/
