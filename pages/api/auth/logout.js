import { deleteSessionFromDB } from '../../../util/database';

export default async function deleteHandler(req, res) {
  console.log('session in deleteHandler', req.body.sessionToken);
  if (req.method === 'POST') {
    await deleteSessionFromDB(req.body.sessionToken);
    res.status(200).send({});
    return;
  }
  res.status(405).send({});
}
