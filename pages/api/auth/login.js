import crypto from 'node:crypto';
import { verifyPassword } from '../../../util/auth';
import { getUserWPASSHASH } from '../../../util/database';

/*
login api route functions (for login):
  - getUserWPASSHASH (to get the user row from users table)
  - hashPassword (to hash the given password)
  - verifyPassword (to see if the hashed password is the same as the one )
(for sessions):
  - deleteExpiredSessions() (X)
  - crypto to create a token (X)
  - insertSession (X)
  - createSRSTC + cookie library
  - gSSP (to redirect)
*/

export default async function login(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      errors: [{ message: 'Please input your username and password' }],
    });
    return;
  }

  // username part
  const userWPASSHASH = await getUserWPASSHASH(req.body.username);
  console.log('userWPASSHASH: ', userWPASSHASH);

  if (!userWPASSHASH) {
    res.status(401).send({
      errors: [{ message: 'Username or password incorrect' }],
    });
    return;
  }

  // password part
  const isPassword = verifyPassword(
    req.body.password,
    userWPASSHASH.userPasshash,
  );
  if (!isPassword) {
    res.status(401).send({
      errors: [{ message: 'Username or password incorrect' }],
    });
    return;
  }

  // destructuring
  const { userPasshash, ...user } = userWPASSHASH;
  res.status(200).send({ user: user });
}
