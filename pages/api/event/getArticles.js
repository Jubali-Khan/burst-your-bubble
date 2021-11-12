import { getArticlesByEventID } from '../../../util/database';

export default async function getArticles(req, res) {
  if (!req.body.eventId) {
    res.status(400).send({
      errors: [{ message: 'No event id passed' }],
    });
    return;
  }
  // console.log('req.body.eventId:', req.body.eventId);

  const articles = await getArticlesByEventID(req.body.eventId);
  // console.log('articles in api getArticles: ', articles);
  if (!articles) {
    res.status(400).send({
      errors: [{ message: 'Articles were not found' }],
    });
    return;
  }
  res.status(200).send(articles);
}
