import { css } from '@emotion/react';
import Link from 'next/link';

const navStyles = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: stretch;
  align-content: stretch;
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

export default function Header(props) {
  return (
    <header>
      {/* Not logged in */}
      {/* <nav css={navStyles}>
        <Link href="/">
          <a>Home</a>
        </Link>

        <Link href="/guide">
          <a>Guide</a>
        </Link>

        <Link href="/login">
          <a>Log In / Sign Up</a>
        </Link>
      </nav> */}
      {/* // Logged in as admin */}
      <nav css={navStyles}>
        <Link href="/">
          <a>Home</a>
        </Link>

        <Link href="/admin/create">
          <a>Create Event</a>
        </Link>
        <Link href="/admin/reports">
          <a>Reports</a>
        </Link>

        <Link href="/logout">
          <a>Log Out</a>
        </Link>
        <Link href="/login">
          <a>Login</a>
        </Link>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </nav>

      {/* Logged in as user*/}
    </header>
  );
}
