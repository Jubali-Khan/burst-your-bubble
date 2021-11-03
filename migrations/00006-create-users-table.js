exports.up = async function up(sql) {
  console.log('Creating users table...');
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      user_name varchar NOT NULL,
      user_email varchar NOT NULL,
      user_passhash varchar(60) NOT NULL,
      role integer REFERENCES roles (id) ON DELETE CASCADE
    );
  `;
};

exports.down = async function up(sql) {
  console.log('Dropping users table...');
  await sql`DROP TABLE users;`;
};