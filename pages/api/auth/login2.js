import crypto from 'node:crypto';
import { verifyPassword } from '../../../util/auth';
import { createSTC } from '../../../util/cookies';
import {
  deleteExpiredSessions,
  deleteExtraSessions,
  getUserWPASSHASH,
  insertSession,
} from '../../../util/database';

export default async function login(req, res) {
  if (!req.body.useremail || !req.body.password) {
    res.status(400).send({
      errors: [{ message: 'Please input your email and password' }],
    });
    return;
  }
  // Verification:
  // username verification part
  const userWPASSHASH = await getUserWPASSHASH(req.body.useremail);
  console.log('userWPASSHASH: ', userWPASSHASH);

  if (!userWPASSHASH) {
    res.status(401).send({
      errors: [{ message: 'Email or password incorrect' }],
    });
    return;
  }

  // password verification part
  const isPassword = await verifyPassword(
    req.body.password,
    userWPASSHASH.userPasshash,
  );
  console.log('isPassword: ', isPassword);
  if (!isPassword) {
    res.status(401).send({
      errors: [{ message: 'Email or password incorrect' }],
    });
    return;
  }
  //

  // Sesh
  // clean old sessions
  deleteExpiredSessions();
  // deleteExtraSessions(userWPASSHASH.id); // causing weird problem where after login, the session is deleted from the db but remains in the browser and header doesn't change to admin/user header

  // Create the record in the sessions table with a new token
  const token = crypto.randomBytes(64).toString('base64');

  const newSession = await insertSession(token, userWPASSHASH.id);

  const sessionTokenCookie = createSTC(newSession.token);
  //

  // destructuring
  const { userPasshash, ...user } = userWPASSHASH;
  res
    .status(200)
    .setHeader('Set-Cookie', sessionTokenCookie)
    .send({ user: user });
}

/*
login api route functions (for login):
  - getUserWPASSHASH (to get the user row from users table)
  - hashPassword (to hash the given password)
  - verifyPassword (to see if the hashed password is the same as the one )
(for sessions):
  - deleteExpiredSessions() (X)
  - crypto to create a token (X)
  - insertSession (X)
  - createSRSTC + cookie library (X)
  - gSSP on page (to redirect) (X)
    - isSessionValid (X)
*/
