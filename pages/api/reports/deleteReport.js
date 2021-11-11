import { deleteReportByID, getRoleByToken } from '../../../util/database';

export default async function deleteReportHandler(req, res) {
  console.log('req.body in deleteReportHandler: ', req.body);
  console.log('req.cookies in deleteReportHandler: ', req.cookies);
  console.log(
    'req.cookies.sessionToken in deleteReportHandler: ',
    req.cookies.sessionToken,
  );
  // is there a session?
  if (!req.cookies.sessionToken) {
    res.status(403).send({
      errors: [{ message: 'no session - not authorized' }],
    });
    return;
  }

  // role:
  const sessionFromDB = await getRoleByToken(req.cookies.sessionToken);
  if (sessionFromDB.role !== 1) {
    res.status(403).send({
      errors: [{ message: 'wrong role - not authorized' }],
    });
    return;
  }

  const reportDeleted = await deleteReportByID(req.body.report_id);

  res.status(200).json(reportDeleted);

  // res.status(404).json({ errors: [{ message: 'no reports in DB' }] });
}
