import {
  addReasons,
  getCommentByID,
  getReportByCID,
  insertReport,
} from '../../../util/database';

export default async function createReport(req, res) {
  console.log('req.body in createReport: ', req.body);
  const { userId, commentId, comment, eventId, reportedFor } = req.body;

  // is there a session?
  if (!req.cookies.sessionToken) {
    res.status(401).send({
      errors: [{ message: 'no session - not authorized' }],
    });
    return;
  }

  //authorization comes here

  // is a comment with this id in comments table?
  const commentInDB = await getCommentByID(commentId);
  // no -> error
  if (!commentInDB) {
    res.status(400).send({
      errors: [
        { message: "the comment you're trying to report no longer exists" },
      ],
    });
    return;
  }
  // yes -> is this comment already in reports table?
  const report = await getReportByCID(commentId);
  console.log('report in createReport: ', report);
  // if no -> add it to the table (insert new report)
  if (!report) {
    const insertedReport = await insertReport(
      userId,
      commentId,
      comment,
      eventId,
      Number(reportedFor),
    );
    res.status(200).send(insertedReport);
    return;
  }

  // if yes -> is it being reported for a reason already in the table?

  const inReport = report.reportedFor.find(
    (element) => element === Number(reportedFor),
  );

  // no = new reason -> add reason number to reported_for array
  if (!inReport) {
    // add reason number to reported_for
    const newReportedFor = [...report.reportedFor, Number(reportedFor)];
    const updatedReport = await addReasons(report.id, newReportedFor);
    res.status(200).send(updatedReport);
    return;
  }
  // yes = reason already there -> update timesReported and acted_on
  if (inReport) {
    const updatedReport = await addReasons(report.id, report.reportedFor);
    res.status(200).send(updatedReport);
    return;
  }
}
