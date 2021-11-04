import { css } from '@emotion/react';
import Footer from './Footer';
import Header from './Header';

const layoutStyles = css`
  min-height: 100vh; /* will cover the 100% of viewport */
  overflow: hidden;
  display: block;
  position: relative;
  padding-bottom: 100px; /* height of your footer */
  @font-family {
    font-family: 'Inter';
    src: url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');
  }
`;

const mainChild = css`
  height: 100%;
  position: relative;
  margin: 2%;
`;

export default function Layout(props) {
  return (
    <div css={layoutStyles}>
      <Header />
      <main css={mainChild}>{props.children}</main>
      <Footer />
    </div>
  );
}
