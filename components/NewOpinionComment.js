import { css } from '@emotion/react';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import EditSpace from './EditSpace';

const containerStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  button {
    max-height: 23px;
  }
`;

const borderAndShadow = css`
  margin: 1%;
  padding: 0.5%;
  border: 1px solid grey;
  border-radius: 5px;
  background-color: #f6f2e9;

  button {
    background-color: white;
    border: 1px solid grey;
    border-radius: 5px;

    :hover {
      background-color: #c5d0d5;
    }
  }
`;

export default function OpinionComment(props) {
  const router = useRouter();

  // console.log('props.comment: ', props.comment);
  console.log('props.userInfo: ', props.userInfo);
  console.log('props.userType: ', props.userType);

  const userName = props.comment.userName;
  const [verbChoice, setVerbChoice] = useState(props.comment.verbChoice);
  const [argument, setArgument] = useState(props.comment.argument);

  const [conjChoice, setConjChoice] = useState(props.comment.conjChoice);
  const [premise, setPremise] = useState(props.comment.premise);

  // editingMode is used to change what OpinionComment returns
  const [editingMode, setEditingMode] = useState(false);
  const [showPremise, setShowPremise] = useState(premise === '' ? false : true);
  //

  //
  const [reportedFor, setReportedFor] = useState('1');
  const [bgcolor, setBgcolor] = useState('white');
  const [showReportDropdown, setShowReportDropdown] = useState(false);
  //

  //
  const returnToLink = `/loginOrRegister?returnTo=events/${props.eventTitle}`;
  function redirectToLoginOrReg() {
    router.push(returnToLink);
    return;
  }

  if (props.userType === undefined) {
    return (
      <div css={borderAndShadow} style={{ fontWeight: 'bold' }}>
        <div css={containerStyles}>
          {userName} {verbChoice} {argument} {premise !== '' ? conjChoice : ''}{' '}
          {premise !== '' ? premise : ''}
          <button onClick={redirectToLoginOrReg}>REPORT</button>
        </div>
      </div>
    );
  }
  //

  // Someone's logged in:
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

    const response = await fetch(`/api/reports/create`, {
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
      if (response.status === 403) {
        redirectToLoginOrReg();
      }
      return;
    } else if (response.status === 200) {
      setShowReportDropdown(!showReportDropdown);
      setBgcolor('lightgreen');
    }
  }

  if (props.comment.userId === props.userInfo.id) {
    // EDIT -> EditSpace
    if (!editingMode) {
      return (
        <div css={borderAndShadow}>
          <div css={containerStyles}>
            {userName} {verbChoice} {argument}{' '}
            {premise !== '' ? conjChoice : ''} {premise !== '' ? premise : ''}
            <button
              className="editB"
              onClick={() => setEditingMode(!editingMode)}
            >
              EDIT
            </button>
          </div>
        </div>
      );
    } else {
      // if (editingMode)
      return (
        <EditSpace
          comment={props.comment}
          verbChoice={verbChoice}
          setVerbChoice={setVerbChoice}
          argument={argument}
          setArgument={setArgument}
          conjChoice={conjChoice}
          setConjChoice={setConjChoice}
          premise={premise}
          setPremise={setPremise}
          setEditingMode={setEditingMode}
          setShowPremise={setShowPremise}
          showPremise={showPremise}
          setMessages={props.setMessages}
          redirectToLoginOrReg={redirectToLoginOrReg}
        />
      );
    }
  } else if (props.comment.userId !== props.userInfo.id) {
    // REPORT
    return (
      <div css={borderAndShadow}>
        <div css={containerStyles}>
          {userName} {verbChoice} {argument} {premise !== '' ? conjChoice : ''}{' '}
          {premise !== '' ? premise : ''}
          <button
            style={{ backgroundColor: bgcolor }}
            className="reportB"
            onClick={() => setShowReportDropdown(!showReportDropdown)}
          >
            {bgcolor === 'white' ? 'REPORT' : 'REPORTED'}
          </button>
        </div>
        <div>
          {showReportDropdown === false ? (
            ''
          ) : (
            <div>
              <hr />
              report for{' '}
              <select
                value={reportedFor}
                onChange={(e) => setReportedFor(e.currentTarget.value)}
              >
                <option value="1">offensive or disrespectful language</option>
                <option value="2">hate language</option>
                <option value="3">spam or scam</option>
                <option value="4">incompliance with comment guidelines</option>
              </select>
              <button onClick={reportHandler}>DONE</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

/*
small problem: adding info to the premise -> clicking on - because you don't want it no more -> the info being sent to the db anyway. - might need to reset the 2 fields.
*/
