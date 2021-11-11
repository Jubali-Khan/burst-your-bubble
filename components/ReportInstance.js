import { css } from '@emotion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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
  }
  .why {
    text-align: center;
    margin: auto;
  }

  .buttons {
    text-align: center;
    margin: auto;
  }
`;

export default function ReportInstance(props) {
  const [commentDeleted, setCommentDeleted] = useState(false);

  async function deleteComment(commentId, reportId) {
    const response = await fetch(
      'http://localhost:3000/api/reports/deleteComment',
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          comment_id: commentId,
          report_id: reportId,
        }),
      },
    );
    const commentDeleted = await response.json();
    console.log('comment from deleteComment: ', commentDeleted);
    if ('errors' in commentDeleted) {
      // setErrors
      props.setErrors(commentDeleted.errors);
      return;
    }
    setCommentDeleted(true);
  }

  async function deleteReport(reportId) {
    const response = await fetch(
      'http://localhost:3000/api/reports/deleteReport',
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          report_id: reportId,
        }),
      },
    );
    const reportDeleted = await response.json();
    if ('errors' in reportDeleted) {
      props.setErrors(reportDeleted.errors);
      return;
    }
    const newReports = props.reports.filter((report) => {
      return report.id !== props.rep.id;
    });
    props.setReports(newReports);
  }

  // const comment = props.comments.find(
  //   (cmnt) => cmnt.id === props.rep.commentId,
  // );
  // console.log('comment:', comment);
  // console.log('props.comments:', props.comments);
  // console.log('props.rep:', props.rep);

  // Reasons to report:
  // 1. offensive and/or disrespectful language
  // 2. hate language
  // 3. spam, scam or fraud
  // 4. incompliance with comment guidelines

  let reportReason;
  if (props.rep.reportedFor === 1) {
    reportReason = 'offensive and/or disrespectful language';
  } else if (props.rep.reportedFor === 2) {
    reportReason = 'hate language';
  } else if (props.rep.reportedFor === 3) {
    reportReason = 'spam, scam or fraud';
  } else if (props.rep.reportedFor === 4) {
    reportReason = 'incompliance with comment guidelines';
  }

  return (
    <div css={reportContainer}>
      <section className="comment">
        {/* using the comment is no longer necessary, only the id is needed to delete the comment. props.rep.comment can be used instead! */}
        {/* {comment.userName} (userId: {comment.userId}) {comment.verbChoice}{' '}
        {comment.argument} */}
        {props.rep.comment}
      </section>
      <hr />
      <section className="why">
        {/* {comment.userName} */} User used {reportReason} (reported{' '}
        {props.rep.timesReported} times)
        {/* times reported and report reason logic needs to be implemented in the report functionality in the comment component and the corresponding tables need to be updated */}
      </section>
      <hr />
      <section className="buttons">
        <button onClick={() => deleteReport(props.rep.id)}>
          delete report
        </button>
        <br />
        <button
          onClick={() => deleteComment(props.rep.commentId, props.rep.id)}
        >
          delete comment
        </button>
        {commentDeleted ? 'comment has been successfuly deleted' : ''}
      </section>
    </div>
  );
}
