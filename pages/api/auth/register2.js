import crypto from 'node:crypto';
import { hashPassword } from '../../../util/auth';
import { createSTC } from '../../../util/cookies';
import {
  deleteExpiredSessions,
  deleteExtraSessions,
  getUserEmailWPASSHASH,
  getUsernameWPASSHASH,
  insertSession,
  insertUser,
} from '../../../util/database';

export default async function register(req, res) {
  // Are all fields occupied
  if (!req.body.username || !req.body.password || !req.body.useremail) {
    res.status(401).send({
      errors: [{ message: 'Please input an email, username and password' }],
    });
    return;
  }
  // maybe before this add an email validation step
  // is username already in DB (duplicate sign up)?
  const userName = req.body.username;
  const userNameExists = await getUsernameWPASSHASH(userName);
  console.log('userNameExists: ', userNameExists);
  if (userNameExists) {
    res.send({
      errors: [{ message: 'Username or email already exist' }],
    });
    return;
  }

  // is email already in DB (duplicate sign up)?
  const userEmail = req.body.useremail;
  const userEmailExists = await getUserEmailWPASSHASH(userEmail);
  console.log('userEmailExists: ', userEmailExists);

  if (userEmailExists) {
    res.send({
      errors: [{ message: 'Username or email already exist' }],
    });
    return;
  }

  // Username and email alright -> hash password & add user to users table
  const passwordHash = await hashPassword(req.body.password);

  const userInserted = await insertUser(userName, userEmail, passwordHash);
  console.log('userInserted in register', userInserted);

  // Some problem while adding user? No can do
  if (!userInserted) {
    res.send({
      errors: [{ message: "An account can't be created at the moment" }],
    });
    return;
  }

  // Sesh
  // clean old sessions
  deleteExpiredSessions();

  // Create the record in the sessions table with a new token
  const token = crypto.randomBytes(64).toString('base64');

  const newSession = await insertSession(token, userInserted.id);

  const sessionTokenCookie = createSTC(newSession.token);
  //

  // destructuring
  const { userPasshash, ...user } = userInserted;
  res
    .status(200)
    .setHeader('Set-Cookie', sessionTokenCookie)
    .send({ user: user });
}
