import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

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

// REPORTS
export async function getReports() {
  const reports = await sql`
  SELECT
    *
  FROM
    comment_reports
  `;
  return reports.map((report) => camelcaseKeys(report));
}

export async function insertReport(
  userId,
  commentId,
  comment,
  eventId,
  reportedFor,
) {
  const reportInserted = await sql`
  INSERT INTO comment_reports
    (user_id, comment_id, comment, event_id, reported_for)
  VALUES
    (${userId}, ${commentId}, ${comment}, ${eventId}, ${reportedFor})
  RETURNING
    *
  `;
  return camelcaseKeys(reportInserted[0]);
}

export async function updateReport(reportId) {
  const updated = await sql`
  UPDATE
    comment_reports
  SET
    acted_on = true
  WHERE
    id = ${reportId}
  RETURNING
    *
  `;
  return camelcaseKeys(updated);
}

export async function deleteReportByID(reportId) {
  const deleted = await sql`
  DELETE FROM
    comment_reports
  WHERE
    id=${reportId}
  RETURNING
    *
  `;
  return camelcaseKeys(deleted);
}
// update report functions needed to increase the number of times_reported (in report button functionality) & to switch acted_on (admin side, deleteHandler or notify handler)

// delete report function
// delete comment function

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

/*
insert into comments (user_id, user_name, verb_choice, argument, event_id) values (1, 'james', 'thinks', 'blahblah', 3);

INSERT INTO comment_reports
    (user_id, comment_id, comment, event_id, reported_for)
  VALUES
    (1, 1, 'user123 thinks blahblah', 3, 2);
*/

// AUTHENTICATION: LOGIN/REGISTER
export async function getUserWPASSHASH(userName) {
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
    user_name,
    user_email
  `;
  return camelcaseKeys(user);
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
