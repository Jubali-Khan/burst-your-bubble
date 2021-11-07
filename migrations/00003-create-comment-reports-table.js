exports.up = async function up(sql) {
  console.log('Creating comment_reports table...');
  await sql`
    CREATE TABLE comment_reports (
      id integer UNIQUE PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      user_id integer NOT NULL,
      comment_id integer NOT NULL,
      comment varchar NOT NULL,
      event_id integer NOT NULL,
      acted_on boolean DEFAULT false,
      reported_for integer NOT NULL,
      times_reported integer DEFAULT 1
    );
  `;
};

exports.down = async function up(sql) {
  console.log('Dropping comment_reports table...');
  await sql`DROP TABLE comment_reports;`;
};
