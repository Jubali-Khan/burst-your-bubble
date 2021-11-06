import { getComments } from '../../../util/database';

export default async function reportHandler(req, res) {
  console.log('req.body: ', req.body);
  const comments = await getComments();

  res.status(200).json(comments);
}
