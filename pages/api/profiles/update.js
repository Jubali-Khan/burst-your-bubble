import {
  getRoleByToken,
  updateUserInfo,
  updateUserInfoInComments,
} from '../../../util/database';

export default async function update(req, res) {
  console.log('req.body in update api: ', req.body);
  const { email, userName, userId } = req.body;

  if (!req.cookies.sessionToken) {
    res.status(403).send({
      errors: [{ message: 'no session - not authorized' }],
    });
    return;
  }

  if (!email || !userName || !userId) {
    res.status(405).send({});
    return;
  }
  const userType = await getRoleByToken(req.cookies.sessionToken);
  if (userType.role !== 2) {
    res.status(403).send({
      errors: [{ message: 'not authorized' }],
    });
    return;
  }

  if (userType.userId !== Number(userId)) {
    res.status(403).send({
      errors: [{ message: 'not authorized' }],
    });
    return;
  }

  const updatedUser = await updateUserInfo(email, userName, userId);
  console.log('updatedUser in API', updatedUser);
  const updatedUserICs = await updateUserInfoInComments(userName, userId);

  res.status(200).send(updatedUser);
}
