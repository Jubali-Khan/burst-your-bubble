import {
  getCommentByID,
  getRoleByToken,
  updateCommentById,
} from '../../../util/database';

export default async function updateComment(req, res) {
  console.log('req.body in updateComment:  ', req.body);
  // is there a session?
  if (!req.cookies.sessionToken) {
    res.status(401).send({
      errors: [{ message: 'no session - not authorized' }],
    });
    return;
  }

  // authorization:
  // role:
  const sessionFromDB = await getRoleByToken(req.cookies.sessionToken);
  console.log('sessionFromDB in updateComment: ', sessionFromDB);
  if (sessionFromDB.role !== 2) {
    res.status(401).send({
      errors: [{ message: 'wrong role - not authorized' }],
    });
    return;
  }

  // was all necessary info sent over?
  const {
    commentId,
    userName,
    verbChoice,
    argument,
    conjChoice,
    premise,
    toggle,
  } = req.body;

  const earlyInput = [userName, verbChoice, argument];
  const fullInput = [
    commentId,
    userName,
    verbChoice,
    argument,
    conjChoice,
    premise,
  ];

  const earlyCheck = earlyInput.indexOf('');
  console.log('empty string index: ', earlyCheck);

  if (earlyCheck > -1) {
    res.status(400).send({
      errors: [{ message: 'Please provide an arugment!' }],
    });
    return;
  }
  //
  // + clicked, not everything was given in
  if (toggle === true) {
    const fullCheck = fullInput.indexOf('');
    console.log('empty string index: ', fullCheck);

    // Problem: this branch doesn't stop code from continuing. Why?
    if (fullCheck > -1) {
      res.status(400).send({
        errors: [{ message: 'Please fill all fields!' }],
      });
      return;
    }
  }
  //
  //

  // is comment still in db?
  const isComment = await getCommentByID(commentId);
  console.log('isComment in updateComment: ', isComment);

  if (!isComment) {
    res.send({
      errors: [
        { message: "The comment you're trying to update doesn't exist" },
      ],
    });
    return;
  }

  const updatedComment = await updateCommentById(
    commentId,
    verbChoice,
    argument,
    conjChoice,
    premise,
  );
  console.log('updatedComment[0] in updateComment: ', updatedComment[0]);
  res.status(200).send({});
}
