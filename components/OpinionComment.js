import { css } from '@emotion/react';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: 1%;
  padding: 0.5%;
  border: 1px solid grey;
  border-radius: 5px;
  background-color: #e0c782;
`;

const borderAndShadow = css`
  margin: 1%;
  padding: 0.5%;
  border: 1px solid grey;
  border-radius: 5px;
  background-color: #e0c782;
`;

export default function OpinionComment(props) {
  const router = useRouter();

  console.log('props.comment: ', props.comment);
  console.log('props.userInfo: ', props.userInfo);
  console.log('props.userType: ', props.userType);

  const [userName, setUserName] = useState(props.comment.userName);
  const [verbChoice, setVerbChoice] = useState(props.comment.verbChoice);
  const [argument, setArgument] = useState(props.comment.argument);

  const [conjChoice, setConjChoice] = useState(props.comment.conjChoice);
  const [premise, setPremise] = useState(props.comment.premise);

  const [reportedFor, setReportedFor] = useState('1');

  // editToggle is used to change what OpinionComment returns
  const [editToggle, setEditToggle] = useState(false);

  const [toggle, setToggle] = useState(false); // Used for both EDIT, or REPORT
  let display = 'none';
  if (!toggle) {
    display = 'none';
  } else if (toggle) {
    display = 'block';
  }

  //
  function redirect() {
    router.push('/loginOrRegister'); // needs a returnTo !!
  }

  if (props.userType === undefined) {
    return (
      <div css={containerStyles}>
        {userName} {verbChoice} {argument} {premise !== '' ? conjChoice : ''}
        {premise !== '' ? premise : ''}
        <button onClick={redirect}>REPORT</button>
      </div>
    );
  }
  //

  //
  // Someone's logged in:
  function cancelEditHandler() {
    setVerbChoice(props.comment.verbChoice);
    setArgument(props.comment.argument);
    setConjChoice(props.comment.conjChoice);
    setPremise(props.comment.premise);
  }

  async function updateHandler() {
    // ping an api route
    const response = await fetch(
      'http://localhost:3000/api/comments/updateComment',
      {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          commentId: props.comment.id,
          userName: userName,
          verbChoice: verbChoice,
          argument: argument,
          conjChoice: conjChoice,
          premise: premise,
          toggle: toggle,
        }),
      },
    );
    const update = await response.json();
    console.log('response.status in OpinionComment: ', response.status);
    if ('errors' in update) {
      props.setMessages(update.errors);
    }
    if (response.status === 200) {
      props.setMessages([{ message: 'comment updated successfully' }]);
      setEditToggle(false);
      return;
    }
  }

  async function reportHandler() {
    // create commen to be inserted into report
    let reportedComment;
    if (premise !== '') {
      reportedComment =
        userName +
        ' ' +
        verbChoice +
        ' ' +
        argument +
        ' ' +
        conjChoice +
        ' ' +
        premise;
    } else {
      reportedComment = userName + ' ' + verbChoice + ' ' + argument + ' ';
    }

    const response = await fetch('http://localhost:3000/api/reports/create', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        userId: props.comment.userId,
        commentId: props.comment.id,
        comment: reportedComment,
        eventId: props.comment.eventId,
        reportedFor: reportedFor,
      }),
    });
    const createdReport = await response.json();
    console.log('createdReport: ', createdReport);

    if ('errors' in createdReport) {
      props.setMessages(createdReport.errors);
      return;
    }
  }

  // original UI for the user's comment
  if (editToggle === false) {
    return (
      <>
        <div css={containerStyles}>
          {userName} {verbChoice} {argument} {premise !== '' ? conjChoice : ''}
          {premise !== '' ? premise : ''}
          {props.comment.userId === props.userInfo.id ? (
            <button onClick={() => setEditToggle(!editToggle)}>EDIT</button>
          ) : (
            <button onClick={() => setToggle(!toggle)}>REPORT</button>
          )}
        </div>
        <div>
          <div style={{ display: display }}>
            <hr />
            report for{' '}
            <select
              value={reportedFor}
              onChange={(e) => setReportedFor(e.currentTarget.value)}
            >
              <option value="1">offensive or disrespectful language</option>
              <option value="2">hate language</option>
              <option value="3">spam</option>
              <option value="4">incompliance with comment guidelines</option>
            </select>
            <button onClick={reportHandler}>DONE</button>
          </div>
        </div>
      </>
    );
  }

  // editing UI for the user's comment
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

          <button className="add" onClick={updateHandler}>
            UPDATE
          </button>
          <button
            className="post"
            onClick={() => {
              setEditToggle(false);
              cancelEditHandler();
            }}
          >
            &#10006;
          </button>
        </form>
      </div>
    );
  }
}
/*
small problem: adding info to the premise -> clicking on - because you don't want it no more -> the info being sent to the db anyway. - might need to reset the 2 fields.
*/
