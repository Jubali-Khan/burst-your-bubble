import {
  deleteCommentByID,
  getRoleByToken,
  updateActedOnToT,
} from '../../../util/database';

export default async function deleteCommentHandler(req, res) {
  console.log('req.body in ddeleteCommentHandler: ', req.body);
  console.log('req.cookies in deleteCommentHandler: ', req.cookies);
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

  // error checking: is comment still in db to begin with? flowchart of possible outcomes would be helpful
  const reportUpdated = await updateActedOnToT(req.body.report_id);
  const commentDeleted = await deleteCommentByID(req.body.comment_id);
  console.log('commentDeleted:', commentDeleted);
  if (!commentDeleted) {
    res.status(400).json({
      errors: [{ message: 'comment not found' }],
    });
    return;
  }
  res.status(200).json(commentDeleted);
}
