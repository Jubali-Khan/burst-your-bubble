exports.up = async function up(sql) {
  console.log('Creating comment_reports table...');
  await sql`
    CREATE TABLE comment_reports (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      user_id integer REFERENCES comments (user_id) ON DELETE CASCADE,
      comment_id integer REFERENCES comments (id) ON DELETE CASCADE,
      event_id integer REFERENCES comments (event_id) ON DELETE CASCADE,
      acted_on boolean NOT NULL,
      reported_for integer NOT NULL,
      times_reported integer NOT NULL
    );
  `;
};

exports.down = async function up(sql) {
  console.log('Dropping comment_reports table...');
  await sql`DROP TABLE comment_reports;`;
};
