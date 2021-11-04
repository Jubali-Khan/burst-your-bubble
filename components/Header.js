import Link from 'next/link';

export default function Header(props) {
  return (
    // Logged in as admin

    // Logged in as user

    // Not logged in

    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>

      <Link href="/guide">
        <a>Guide</a>
      </Link>

      <Link href="/login">
        <a>Log In</a>
      </Link>
    </nav>
  );
}
