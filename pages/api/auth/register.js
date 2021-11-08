import { hashPassword } from '../../../util/auth';
import {
  getUserEmailWPASSHASH,
  getUsernameWPASSHASH,
  insertUser,
} from '../../../util/database';

export default async function register(req, res) {
  if (!req.body.username || !req.body.password || !req.body.useremail) {
    res.send({
      errors: [{ message: 'Please input an email, username and password' }],
    });
    return;
  }

  const userName = req.body.username;
  const userNameExists = await getUsernameWPASSHASH(userName);
  console.log('userNameExists: ', userNameExists);
  if (userNameExists) {
    res.send({
      errors: [{ message: 'Username or email already exist' }],
    });
    return;
  }

  const userEmail = req.body.useremail;
  const userEmailExists = await getUserEmailWPASSHASH(userEmail);
  console.log('userEmailExists: ', userEmailExists);

  if (userEmailExists) {
    res.send({
      errors: [{ message: 'Username or email already exist' }],
    });
    return;
  }

  const passwordHash = await hashPassword(req.body.password);

  const userInserted = await insertUser(userName, userEmail, passwordHash);

  res.status(200).send({ userInserted: userInserted });
}
