import { css } from '@emotion/react';
import Link from 'next/link';

const footerStyles = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;

  position: absolute;
  bottom: 0;
  width: 94vw;

  font-weight: bold;

  background-color: lightblue;
  border-radius: 10px;
  margin: 1%;
  padding: 1% 1.5%;

  a {
    text-decoration: none;
    color: inherit;
  }
  div {
    display: inline;
  }
`;
type UserInfo = {
  id: number;
  userName: string;
  userId: number;
};
type Props = {
  userType: string | undefined;
  userInfo: UserInfo | undefined;
};

export default function Footer(props: Props) {
  console.log('props.userType in Footer: ', props.userType);
  if (!props.userType) {
    return (
      <footer css={footerStyles}>
        {/* Not logged in */}
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>
        <div>
          <Link href="/guide">
            <a>Guide</a>
          </Link>
        </div>
        <div>
          <Link href="/loginOrRegister">
            <a>Login / Register</a>
          </Link>
        </div>
      </footer>
    );
  }
  if (props.userType === 'admin') {
    return (
      <footer css={footerStyles}>
        {/* // Logged in as admin */}
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>

        <div>
          <Link href="/logout">
            <a>Log Out</a>
          </Link>
        </div>
      </footer>
    );
  }

  const profileLink = `/profile/${props.userInfo?.userId}`;

  return (
    <footer css={footerStyles}>
      {/* Logged in as user*/}
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
      <div>
        <Link href="/guide">
          <a>Guide</a>
        </Link>
        <br />
        <Link href={profileLink}>
          <a>My Profile</a>
        </Link>
      </div>
      <div>
        <Link href="/logout">
          <a>Log Out</a>
        </Link>
      </div>
    </footer>
  );
}
