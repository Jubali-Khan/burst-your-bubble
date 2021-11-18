import {
  addReasons,
  getCommentByID,
  getReportByCID,
  insertReport,
} from '../../../util/database';

export default async function createReport(req, res) {
  //authorization comes here

  // is a comment with this id in comments table?
  const comment = await getCommentByID(9);
  // no -> error
  if (!comment) {
    res.status(400).send({
      errors: [
        { message: "the comment you're trying to report no longer exists" },
      ],
    });
    return;
  }
  // yes -> is this comment already in reports table?
  const report = await getReportByCID(9);
  console.log('report in createReport: ', report);
  // if no -> add it to the table (insert new report)
  if (!report) {
    const insertedReport = await insertReport(
      req.body.userId,
      req.body.commentId,
      req.body.comment,
      req.body.eventId,
      req.body.reportedFor,
    );
    res.status(200).send(insertedReport);
    return;
  }

  // if yes -> is it being reported for a reason already in the table?

  const inReport = report.reportedFor.find(req.body.reportedFor);

  // no = new reason -> add reason number to reportedFor array
  if (!inReport) {
    // add reason number to reportedFor
    const newReportedFor = [...report.reportedFor, req.body.reportedFor];
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
  res.status(200).send(report);
}
