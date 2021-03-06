exports.up = async function up(sql) {
  console.log('Creating all_notifications table...');
  await sql`
    CREATE TABLE all_notifications (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      user_id integer NOT NULL,
      comment_id integer NOT NULL,
      event_id integer NOT NULL,
      reported_for integer NOT NULL,
      shown boolean NOT NULL
    );
  `;
};

exports.down = async function up(sql) {
  console.log('Dropping all_notifications table...');
  await sql`DROP TABLE all_notifications;`;
};
