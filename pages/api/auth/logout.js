import { deleteSession } from '../../../util/database';

export default async function deleteHandler(req, res) {
  console.log('session in deleteHandler', req.body.sessionToken);
  if (req.method === 'POST') {
    await deleteSession(req.body.sessionToken);
    res.status(200).send({});
    return;
  }
  res.status(405).send({});
}
