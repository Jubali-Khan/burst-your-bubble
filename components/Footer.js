import { css } from '@emotion/react';
import Link from 'next/link';

const footerStyles = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
  align-content: stretch;

  position: absolute;
  bottom: 0;
  width: 98vw;

  background-color: lightblue;
  border-radius: 10px;
  margin: 1%;
  padding: 1% 1.5%;
`;

export default function Footer(props) {
  return (
    <footer css={footerStyles}>
      <Link href="/">
        <a>Home</a>
      </Link>

      <Link href="/guide">
        <a>Guide</a>
      </Link>

      <Link href="/login">
        <a>Log In / Sign Up</a>
      </Link>
    </footer>
  );
}
