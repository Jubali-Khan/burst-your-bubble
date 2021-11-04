// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { insertArticles, insertEvent } from '../../../util/database';

export default async function eventCreate(req, res) {
  console.log(`req.body`, req.body);
  const {
    eventTitle,
    leftLogo,
    leftLink,
    leftHeadline,
    leftAuthorS,
    rightLogo,
    rightLink,
    rightHeadline,
    rightAuthorS,
    eventLink,
    leftArticle,
    rightArticle,
  } = req.body;

  // insert data into events table
  const event = await insertEvent(
    eventTitle,
    leftLogo,
    leftLink,
    leftHeadline,
    leftAuthorS,
    rightLogo,
    rightLink,
    rightHeadline,
    rightAuthorS,
    eventLink,
  );
  console.log('event from db:', event);

  // get event_id
  const eventId = event.id;
  // insert data into articles table
  const articlesEntry = await insertArticles(
    leftArticle,
    rightArticle,
    eventId,
  );
  console.log('articlesEntry from DB', articlesEntry);

  const status = {};
  status.event = event.id;
  status.article = articlesEntry.id;

  console.log('status object:', status);

  if (
    typeof status.event === 'undefined' ||
    typeof status.article === 'undefined'
  ) {
    res.status(401).send({
      errors: [{ message: "Event info or articles couldn't be inserted" }],
    });
    return;
  }

  res.status(200).json(status);
}
