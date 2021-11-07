import { deleteReportByID } from '../../../util/database';

export default async function deleteHandler(req, res) {
  console.log('req.body in deleteHandler: ', req.body);

  const reportDeleted = await deleteReportByID(req.body.report_id);

  res.status(200).json(reportDeleted);

  // res.status(404).json({ errors: [{ message: 'no reports in DB' }] });
}
