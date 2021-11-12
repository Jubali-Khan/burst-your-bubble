import { getEventByTitle } from '../../../util/database';

export default async function getInfo(req, res) {
  // console.log('req.body in getInfo: ', req.body);
  if (!req.body.eventTitle) {
    res.status(400).send({
      errors: [{ message: 'No event title passed' }],
    });
    return;
  }

  const event = await getEventByTitle(req.body.eventTitle);
  // console.log('event in api getInfo: ', event);

  if (!event) {
    res.status(400).send({
      errors: [{ message: 'No event found' }],
    });
    return;
  }

  res.status(200).send(event);
}
