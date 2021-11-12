import { getCommentsByEventID } from '../../../util/database';

export default async function getComments(req, res) {
  if (!req.body.eventId) {
    res.status(400).send({
      errors: [{ message: 'No event id passed' }],
    });
    return;
  }
  console.log('req.body.eventId:', req.body.eventId);

  const comments = await getCommentsByEventID(req.body.eventId);
  console.log('comments in api getComments: ', comments);

  // comments are being return {count: 0, ...} when the query isn't finding anything, why is that?
  if (!comments) {
    res.status(400).send({
      errors: [{ message: 'Comments were not found' }],
    });
    return;
  }

  res.status(200).send(comments);
}
