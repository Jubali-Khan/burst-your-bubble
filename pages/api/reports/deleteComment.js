import { deleteCommentByID, updateReport } from '../../../util/database';

export default async function deleteHandler(req, res) {
  console.log('req.body in deleteHandler: ', req.body);

  // error checking: is comment still in db to begin with? flowchart of possible outcomes would be helpful

  const reportUpdated = await updateReport(req.body.report_id);
  const commentDeleted = await deleteCommentByID(req.body.comment_id);

  res.status(200).json(commentDeleted);

  // res.status(404).json({ errors: [{ message: 'no reports in DB' }] });
}
