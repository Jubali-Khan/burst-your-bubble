import { css } from '@emotion/react';
import Link from 'next/link';

const navStyles = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  font-weight: bold;

  background-color: lightblue;
  border-radius: 10px;
  margin: 1%;
  padding: 1% 3%;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const adminCenterStyles = css`
  display: flex;
  flex-direction: row;
  width: 50%;
  text-align: center;
  justify-content: space-around;
`;

const centerStyles = css`
  display: flex;
  flex-direction: row;
  width: 50%;
  text-align: center;
  justify-content: space-around;
`;

export default function Header(props) {
  console.log('props.userType in Header: ', props.userType);
  if (!props.userType) {
    return (
      <header>
        {/* Not logged in */}
        <nav css={navStyles}>
          <Link href="/">
            <a>Home</a>
          </Link>
          <section css={centerStyles}>
            <Link href="/guide">
              <a>Guide</a>
            </Link>
          </section>
          <Link href="/loginOrRegister">
            <a>Login / Register</a>
          </Link>
        </nav>
      </header>
    );
  }
  if (props.userType === 'admin') {
    return (
      <header>
        {/* // Logged in as admin */}
        <nav css={navStyles}>
          <Link href="/">
            <a>Home</a>
          </Link>
          <section css={adminCenterStyles}>
            <Link href="/admin/create">
              <a>Create Event</a>
            </Link>
            <Link href="/admin/reports">
              <a>Reports</a>
            </Link>
          </section>
          <Link href="/logout">
            <a>Log Out</a>
          </Link>
        </nav>
      </header>
    );
  }
  if (props.userType === 'user') {
    return (
      <header>
        {/* Logged in as user*/}
        <nav css={navStyles}>
          <Link href="/">
            <a>Home</a>
          </Link>
          <section css={centerStyles}>
            <Link href="/guide">
              <a>Guide</a>
            </Link>
            <Link href="/profile/somenumber">
              <a>My Profile</a>
            </Link>
          </section>

          <Link href="/logout">
            <a>Log Out</a>
          </Link>
        </nav>
      </header>
    );
  }
}
