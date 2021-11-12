// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  getRoleByToken,
  insertArticles,
  insertEvent,
} from '../../../util/database';

export default async function eventCreate(req, res) {
  console.log('req.body in eventCreate: ', req.body);
  console.log('req.cookies in eventCreate: ', req.cookies);
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

  console.log('eventTitle in api/create:', eventTitle);

  const inputArray = [
    eventTitle,
    leftLogo,
    leftLink,
    leftHeadline,
    leftAuthorS,
    rightLogo,
    rightLink,
    rightHeadline,
    rightAuthorS,
    // eventLink,
    leftArticle,
    rightArticle,
  ];

  const undefinedElementIndex = inputArray.indexOf(undefined);

  console.log('undefined element index: ', undefinedElementIndex);

  if (undefinedElementIndex > -1) {
    res.status(401).send({
      errors: [{ message: 'Please fill all inputs with data' }],
    });
    return;
  }

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
