import { getComments } from '../../../util/database';

export default async function commentCreate(req, res) {
  console.log('req.body in commentPoster: ', req.body);

  res.status(200).json([]);
}
