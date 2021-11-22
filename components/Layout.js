import { css } from '@emotion/react';
import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

const layoutStyles = css`
  min-height: 100vh; /* will cover the 100% of viewport */
  overflow: hidden;
  display: block;
  position: relative;
  padding-bottom: 100px; /* height of your footer */

  font-family: 'Inter';
`;

const mainChild = css`
  height: 100%;
  position: relative;
  margin: 2%;
`;

export default function Layout(props) {
  console.log('props.userType in Layout: ', props.userType);
  return (
    <div css={layoutStyles}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;500;600"
          rel="stylesheet"
        />
      </Head>
      <Header userType={props.userType} />
      <main css={mainChild}>{props.children}</main>
      <Footer userType={props.userType} />
    </div>
  );
}
