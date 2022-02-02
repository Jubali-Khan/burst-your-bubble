import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

setPostgresDefaultsOnHeroku();

dotenvSafe.config();

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    // When we're in development, make sure that we connect only
    // once to the database
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
  }

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

//  comments.user_id,
// comments.event_id,
// EVENTS
export async function insertEvent(
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
) {
  const event = await sql`
  INSERT INTO events
  (event_title, left_logo, left_link, left_headline, left_author_s, right_logo, right_link, right_headline, right_author_s, event_link)
  VALUES
    (${eventTitle}, ${leftLogo}, ${leftLink}, ${leftHeadline}, ${leftAuthorS}, ${rightLogo}, ${rightLink}, ${rightHeadline}, ${rightAuthorS}, ${eventLink})
  RETURNING
    *
  `;
  return camelcaseKeys(event[0]);
}

export async function getEventByTitle(eventTitle) {
  // convert title to
  const event = await sql`
  SELECT
    *
  FROM
    events
  WHERE
    event_title = ${eventTitle}
  `;
  // console.log('event in getEventByTitle: ', event[0]);
  return camelcaseKeys(event[0]);
}
export async function getEventsByUserID(UserID) {
  const events = await sql`
  SELECT
    events.id,
    events.event_title,
    events.left_logo,
    events.left_link,
    events.left_headline,
    events.left_author_s,
    events.right_logo,
    events.right_link,
    events.right_headline,
    events.right_author_s,
    events.event_link
  FROM
    comments,
    events
  WHERE
    comments.event_id = events.id AND
    comments.user_id = ${UserID} LIMIT 1
  `;
  // console.log('events in DB: ', events);
  return events.map((event) => camelcaseKeys(event));
}

export async function getEvents() {
  const events = await sql`
  SELECT
    *
  FROM
    events
  `;
  return events.map((event) => camelcaseKeys(event));
}

// ARTICLES
export async function insertArticles(leftArt, rightArt, eventId) {
  const articlesEntry = await sql`
  INSERT INTO articles
    (left_art, right_art, event_id)
  VALUES
    (${leftArt},${rightArt},${eventId})
  RETURNING
    *
  `;
  return camelcaseKeys(articlesEntry[0]);
}

export async function getArticlesByEventID(eventId) {
  const [articles] = await sql`
  SELECT
    *
  FROM
    articles
  WHERE
    event_id = ${eventId}
  `;
  // console.log('articles in getArticlesByEventID:', articles);
  return camelcaseKeys(articles);
}

// REPORTS
export async function getReports() {
  const reports = await sql`
  SELECT
    *
  FROM
    reports
  `;
  return reports.map((report) => camelcaseKeys(report));
}

export async function getReportByCID(commentId) {
  const report = await sql`
  SELECT
    *
  FROM
    reports
  WHERE
    comment_id=${commentId}
  `;
  // console.log('report[0] in DB: ', report[0]);
  return camelcaseKeys(report[0]);
}

export async function insertReport(
  userId,
  commentId,
  comment,
  eventId,
  reportedFor,
) {
  const reportInserted = await sql`
  INSERT INTO reports
    (user_id, comment_id, comment, event_id, reported_for)
  VALUES
    (${userId}, ${commentId}, ${comment}, ${eventId}, ARRAY[${reportedFor}])
  RETURNING
    *
  `;
  // console.log('reportInserted in DB: ', reportInserted);
  return camelcaseKeys(reportInserted[0]);
}

export async function updateActedOnToT(reportId) {
  const updated = await sql`
  UPDATE
    reports
  SET
    acted_on = true
  WHERE
    id = ${reportId}
  RETURNING
    *
  `;
  return camelcaseKeys(updated);
}

// unnecessary
export async function updateActedOnToF(reportId) {
  const updated = await sql`
  UPDATE
    reports
  SET
    acted_on = false
  WHERE
    id = ${reportId}
  RETURNING
    *
  `;
  return camelcaseKeys(updated);
}

export async function updateTimesReported(reportId) {
  const updated = await sql`
  UPDATE
    reports
  SET
    times_reported = times_reported + 1
  WHERE
    id = ${reportId}
  RETURNING
    *
  `;
  return camelcaseKeys(updated);
}
//

export async function deleteReportByID(reportId) {
  const deleted = await sql`
  DELETE FROM
    reports
  WHERE
    id=${reportId}
  RETURNING
    *
  `;
  return camelcaseKeys(deleted);
}

// updateReasons might be a better name
export async function addReasons(reportId, newReasons) {
  console.log('reportId in DB: ', reportId);
  console.log('newReasons in DB: ', newReasons);
  const updatedReport = await sql`
  UPDATE
    reports
  SET
    reported_for = ARRAY[${newReasons}],
    times_reported = times_reported + 1,
    acted_on = false
  WHERE
    id = ${reportId}
  `;
  // console.log('updatedReport in DB: ', updatedReport);
  return camelcaseKeys(updatedReport);
}

// COMMENTS
export async function getCommentByID(commentId) {
  const comment = await sql`
  SELECT
    *
  FROM
    comments
  WHERE
    id = ${commentId}
  `;
  return camelcaseKeys(comment[0]);
}

export async function getComments() {
  const comments = await sql`
  SELECT
    *
  FROM
    comments
  `;
  return comments.map((comment) => camelcaseKeys(comment));
}

export async function deleteCommentByID(commentId) {
  const commentDeleted = await sql`
  DELETE
  FROM
    comments
  WHERE
    id = ${commentId}
  RETURNING
    *
  `;
  return camelcaseKeys(commentDeleted[0]);
}

export async function getCommentsByEventID(eventId) {
  const comments = await sql`
  SELECT
    *
  FROM
    comments
  WHERE
    event_id = ${eventId}
  `;
  // console.log('comments in getCommentsByEventID: ', comments);
  return comments.map((comment) => camelcaseKeys(comment));
}

export async function insertComment(
  userId,
  userName,
  verbChoice,
  argument,
  conjChoice,
  premise,
  eventId,
) {
  const insertedComment = await sql`
    INSERT INTO comments
      (user_id, user_name, verb_choice, argument, conj_choice, premise, event_id)
    VALUES
      (${userId}, ${userName}, ${verbChoice}, ${argument}, ${conjChoice}, ${premise}, ${eventId})
    RETURNING
      *
    `;
  // console.log('insertedComment[0] in insertComment: ', insertedComment[0]);
  return camelcaseKeys(insertedComment[0]);
}

export async function updateCommentById(
  id,
  verbChoice,
  argument,
  conjChoice,
  premise,
) {
  const updatedComment = await sql`
  UPDATE
    comments
  SET
    verb_choice = ${verbChoice},
    argument = ${argument},
    conj_choice = ${conjChoice},
    premise = ${premise}
  WHERE
    comments.id = ${id}`;
  // console.log('updatedComment in DB: ', updatedComment);
  return camelcaseKeys(updatedComment);
}

/*
insert into comments (user_id, user_name, verb_choice, argument, event_id) values (3, 'user2', 'believes', 'blahblah blehbleh', 8);

INSERT INTO reports
    (user_id, comment_id, comment, event_id, reported_for)
  VALUES
    (2, 9, 'user1 agrees that donald trump is orange', 7, '{2}');

INSERT INTO users
    (user_name, user_email, user_passhash, role)
  VALUES
    ('admin', 'admin@admin.admin', '', 1);


INSERT INTO roles
    (role)
  VALUES
    ('admin');

INSERT INTO roles
    (role)
  VALUES
    ('user');
*/

// AUTHENTICATION: LOGIN/REGISTER
export async function getUserWPASSHASH(userEmail) {
  const [user] = await sql`
  SELECT
    *
  FROM
    users
  WHERE
    user_email = ${userEmail}
  `;
  return camelcaseKeys(user);
}
export async function getUsernameWPASSHASH(userName) {
  const [user] = await sql`
  SELECT
    *
  FROM
    users
  WHERE
    user_name = ${userName}
  `;
  return camelcaseKeys(user);
}

export async function getUserEmailWPASSHASH(userEmail) {
  const [user] = await sql`
  SELECT
    *
  FROM
    users
  WHERE
    user_email = ${userEmail}
  `;
  return camelcaseKeys(user);
}

// USERS
export async function insertUser(name, email, passhash) {
  const user = await sql`
  INSERT INTO users
    (user_name, user_email, user_passhash)
  VALUES
    (${name}, ${email}, ${passhash})
  RETURNING
    id,
    user_name,
    user_email
  `;
  return camelcaseKeys(user[0]);
}

export async function getUsernameByID(id) {
  const username = await sql`
  SELECT
    username
  FROM
    users
  WHERE
    users.id = ${id}
  `;
  // console.log('username in getUsernamebyid: ', username);
  return camelcaseKeys(username);
}

export async function updateUserInfo(email, username, userId) {
  const updatedUser = await sql`
  UPDATE
    users
  SET
    user_email = ${email},
    user_name = ${username}
  WHERE
    id = ${userId}
`;
  // console.log('updatedUser in DB: ', updatedUser);
  return camelcaseKeys(updatedUser);
}
export async function updateUserInfoInComments(username, userId) {
  const updatedUser = await sql`
  UPDATE
    comments
  SET
    user_name = ${username}
  WHERE
    comments.user_id = ${userId}
`;
  // console.log('updatedUser in uUIICs: ', updatedUser);
  return camelcaseKeys(updatedUser);
}

// SESSIONS
export async function deleteExpiredSessions() {
  const sessions = await sql`
  DELETE FROM
    sessions
  WHERE
    expiry_timestamp < NOW()
  RETURNING
    *
  `;
  return sessions.map((session) => camelcaseKeys(session));
}

export async function deleteExtraSessions(userId) {
  const sessions = await sql`
  DELETE FROM
    sessions
  WHERE
    user_id = ${userId}
  RETURNING
    *
  `;
  return sessions.map((session) => camelcaseKeys(session));
}

export async function deleteSessionFromDB(token) {
  const sessions = await sql`
  DELETE FROM
    sessions
  WHERE
    token = ${token}
  RETURNING
  *
  `;
  return sessions.map((session) => camelcaseKeys(session));
}

export async function insertSession(token, user_id) {
  const [session] = await sql`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${user_id})
    RETURNING
      *
  `;
  return camelcaseKeys(session);
}

export async function isSessionValid(token) {
  if (!token) return undefined;
  const sessions = await sql`
  SELECT
    *
  FROM
    sessions
  WHERE
    token = ${token} AND expiry_timestamp > NOW()
  `;
  return sessions.map((session) => camelcaseKeys(session));
}

export async function isAdminSession(token) {
  if (!token) return undefined;
  const session = await sql`
  SELECT
    sessions.id,
    sessions.token,
    sessions.expiry_timestamp,
    sessions.user_id,
    users.id,
    users.role
  FROM
    sessions,
    users
  WHERE
    sessions.token = ${token} AND
    sessions.expiry_timestamp > NOW() AND
    users.role = 1 AND
    sessions.user_id = users.id
  `;
  // console.log('session in isAdminSession: ', session[0]);
  return camelcaseKeys(session[0]);
}

export async function getRoleByToken(token) {
  if (!token) return undefined;
  const session = await sql`
  SELECT
    sessions.id,
    sessions.token,
    sessions.expiry_timestamp,
    sessions.user_id,
    users.id,
    users.role
  FROM
    sessions,
    users
  WHERE
    sessions.token = ${token} AND
    sessions.expiry_timestamp > NOW() AND
    (sessions.user_id = users.id AND
    (users.role = 1 OR users.role = 2))
  `;
  // console.log('userType in getRoleByToken: ', session[0]);
  return camelcaseKeys(session[0]);
}

export async function getUserinfoByToken(token) {
  const userInfo = await sql`
    SELECT
      users.id,
      users.user_name,
      users.user_email,
      sessions.user_id
    FROM
      users,
      sessions
    WHERE
      sessions.token = ${token} AND
      sessions.user_id = users.id
    `;
  // console.log('userInfo in getUserinfoByToken: ', userInfo[0]);
  return camelcaseKeys(userInfo[0]);
}
