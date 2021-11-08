import { deleteSession } from '../../../util/database';

export async function handler(req, res) {
  if (req.method === 'GET') {
    await deleteSession(req.cookies.sessionToken);
    res.status(200).send({});
  }
  res.status(405).send({});
}
