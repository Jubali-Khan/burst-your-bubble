import { css } from '@emotion/react';
import Markdown from 'markdown-to-jsx';
import { useState } from 'react';

const reportContainer = css`
  border: 1px grey solid;
  border-radius: 10px;
  margin: 1% 2%;
  padding: 1%;

  display: flex;
  flex-direction: row;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  .delete {
    background-color: transparent;
    border-radius: 25%;
  }

  :hover {
    background-color: #e3e3e3;
  }

  .comment {
    text-align: center;
    margin: auto;
    width: 20%;
  }
  .why {
    text-align: left;
    margin: auto;
    width: 26%;
  }

  .buttons {
    text-align: center;
    margin: auto;
  }
`;

export default function ReportInstance(props) {
  const [deactivateComment, setDeactivatedComment] = useState(false);
  async function deleteComment(commentId, reportId) {
    const response = await fetch(`/api/reports/deleteComment`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        comment_id: commentId,
        report_id: reportId,
      }),
    });
    if (response.status === 403) {
      console.log('response status is 403');
      props.setRefresher(true);
    }

    const commentDeleted = await response.json();
    console.log('comment from deleteComment: ', commentDeleted);
    if ('errors' in commentDeleted) {
      // setErrors
      if (response.status === 400) {
        props.setErrors(commentDeleted.errors);
        return;
      }
      return;
    } else {
      props.setMessages('Comment deleted successfuly!');
      setDeactivatedComment(true);
    }
  }

  async function deleteReport(reportId) {
    const response = await fetch(`/api/reports/deleteReport`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        report_id: reportId,
      }),
    });
    if (response.status === 403) {
      console.log('response status is 403');
      props.setRefresher(true);
    }

    const reportDeleted = await response.json();
    if ('errors' in reportDeleted) {
      if (response.status === 400) {
        props.setErrors(reportDeleted.errors);
        return;
      }
      return;
    }
    const newReports = props.reports.filter((report) => {
      return report.id !== props.rep.id;
    });
    props.setReports(newReports);
  }

  // Reasons to report:
  // 1. offensive and/or disrespectful language
  // 2. hate language
  // 3. spam or scam
  // 4. incompliance with comment guidelines
  const reportCodes = props.rep.reportedFor;

  const reason1 =
    reportCodes.find((entry) => entry === 1) !== undefined
      ? '\n1. offensive and/or disrespectful language'
      : '';
  const reason2 =
    reportCodes.find((entry) => entry === 2) !== undefined
      ? '\n2. hate language'
      : '';
  const reason3 =
    reportCodes.find((entry) => entry === 3) !== undefined
      ? '\n3. spam or scam'
      : '';
  const reason4 =
    reportCodes.find((entry) => entry === 4) !== undefined
      ? '\n4. incompliance with comment guidelines'
      : '';

  const reportReasons = ''
    .concat(reason1)
    .concat(reason2)
    .concat(reason3)
    .concat(reason4);
  return (
    <div css={reportContainer}>
      <section className="comment">{props.rep.comment}</section>
      <hr />
      <section className="why">
        {props.rep.timesReported > 1
          ? `reported ${props.rep.timesReported} times for:\t`
          : `reported ${props.rep.timesReported} time for:\t`}
        <Markdown>{reportReasons}</Markdown>
      </section>
      <hr />
      <section className="buttons">
        <button onClick={() => deleteReport(props.rep.id)}>report</button>
        <br />
        {deactivateComment ? (
          <button disabled>comment</button>
        ) : (
          <button
            onClick={() => deleteComment(props.rep.commentId, props.rep.id)}
          >
            comment
          </button>
        )}
      </section>
    </div>
  );
}
