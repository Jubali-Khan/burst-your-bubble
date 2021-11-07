/*
login api route functions (for login):
  - getUserWPASSHASH (to get the user row from users table)
  - hashPassword (to hash the given password)
  - verifyPassword (to see if the hashed password is the same as the one )
(for sessions):
  - deleteExpiredSessions()
  - crypto to create a token
  - insertSession
  - createSRSTC
  - gSSP (to redirect)
*/

export default function login(req, res) {
  res.status(200).json({ name: 'John Doe' });
}
