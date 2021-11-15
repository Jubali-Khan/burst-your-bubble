import { getRoleByToken, insertComment } from '../../../util/database';

export default async function commentCreate(req, res) {
  console.log('req.body in commentPoster: ', req.body);
  const sessionFromDB = await getRoleByToken(req.cookies.sessionToken);
  if (sessionFromDB.role !== 2) {
    res.status(403).send({
      errors: [{ message: 'wrong role' }],
    });
    return;
  }

  const {
    userId,
    userName,
    verbChoice,
    argument,
    conjChoice,
    premise,
    eventId,
    toggle,
  } = req.body;
  const earlyInput = [userId, userName, verbChoice, argument, eventId];
  const fullInput = [
    userId,
    userName,
    verbChoice,
    argument,
    conjChoice,
    premise,
    eventId,
  ];

  const earlyCheck = earlyInput.indexOf('');
  console.log('empty string index: ', earlyCheck);

  if (earlyCheck > -1) {
    res.status(401).send({
      errors: [{ message: 'Please provide an arugment!' }],
    });
    return;
  }
  //
  // + clicked, not everything was given in
  if (toggle === true) {
    const fullCheck = fullInput.indexOf('');
    console.log('empty string index: ', fullCheck);

    if (fullCheck > -1) {
      res.send({
        errors: [{ message: 'Please fill all fields!' }],
      });
      return;
    }
  }
  //
  //

  const createdComment = await insertComment(
    userId,
    userName,
    verbChoice,
    argument,
    conjChoice,
    premise,
    eventId,
  );
  console.log('createdComment in api createComment: ', createdComment);
  res.status(200).json(createdComment);
}
