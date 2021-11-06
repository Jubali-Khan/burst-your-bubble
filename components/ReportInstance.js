export default function ReportInstance(props) {
  console.log('props.rep in ReportInstance:', props.rep);
  console.log('props.comments in ReportInstance:', props.comments);
  const comment = props.comments.filter(
    (cmnt) => props.rep.commentId === cmnt.id,
  );
  console.log('comment in ReportInstance: ', comment);

  return (
    <div>
      userId: {comment[0].userId}
      <br />
      {comment[0].userName} {comment[0].verbChoice} {comment[0].argument}{' '}
    </div>
  );
}

// const comment = await response.json();
// checkbox and the 2 buttons
// comment info:
// 1. comment with userId and eventId
// 2. reason for report and times reported
