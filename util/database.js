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
