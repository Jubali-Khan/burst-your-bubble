import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';

const containerStyles = css`
  margin: 2% 8%;
  padding: 1% 2%;
  background-color: #faf9f4;
  border-radius: 10px;
  border: 1px solid grey;

  img {
    border-radius: 10px;
    border: 1px solid grey;
  }
`;

export default function Guide(props) {
  return (
    <Layout userType={props.userType} userInfo={props.userInfo}>
      <Head>
        <title>Guide</title>
      </Head>
      <div css={containerStyles}>
        <h1>Guide</h1>
        <p>
          To understand how to use Burst Your Bubble and what it is, it’s
          necessary to go over the two following terms:
        </p>
        <ul>
          <li>
            Confirmation bias: looking for and interpreting data or information
            in a way that confirms or supports one’s prior beliefs and values.
            Confirmation bias can be more clear and noticeable in heavily
            emotional situations or where deep beliefs are in question.
          </li>
          <br />
          <li>
            Filter bubble: a space created by content-selecting algorithms on
            social media websites where most if not all of the information shown
            gradually isolates the user from information or views that might
            conflict with their own viewpoints. The aforementioned algorithms
            essentially play on the user’s inherent confirmation bias to drive
            engagement, growth or advertising revenue.
          </li>
        </ul>
        <p>
          Burst Your Bubble is a platform where users can read pairs of news
          report on the same topic or event, which are usually retrieved from
          sources with different political leanings. Both texts are placed next
          to one another and aim of this juxtaposition is to highlight the
          differences between reportings that are usually aimed at different,
          sometimes polarized parts of the population.
        </p>
        <Image
          src="https://res.cloudinary.com/dvnaeajid/image/upload/v1638215566/Screen_Shot_2021-11-29_at_19.59.16_qk0o0j.png"
          width="2416px"
          height="1360px"
        />
        <br />
        <p>
          Moreover, while these news articles are expected to contain roughly
          the same information, which they sometimes do, the way information is
          presented and dealt with may leave readers with widely differing
          opinions. Which is why a comment section is provided.
        </p>
        <Image
          src="https://res.cloudinary.com/dvnaeajid/image/upload/v1638213462/Screen_Shot_2021-11-29_at_20.16.08_q5ozff.png"
          width="2416px"
          height="730px"
        />
        <br />
        <p>
          However, unlike most comment section, you can only leave comments in a
          specific format. The format follows the structure of an argument,
          which consists of a conclusion and a premise to support that
          conclusion.
        </p>
        <Image
          src="https://res.cloudinary.com/dvnaeajid/image/upload/v1638215772/Screen_Shot_2021-11-29_at_20.16.51_vyykgx.png"
          width="2416px"
          height="244px"
        />
        <br />
        <br />
        <hr />
        <br />
        <p>
          I believe that when you force yourself to formulate your thoughts in a
          non-personal and formally coherent way, you’re contributing in a more
          beneficial way to the overall topic or discussion. You’d also be
          confronting your own confirmation bias and mitigating its effects on
          your thought process.
        </p>
        <br />
        <p style={{ fontStyle: 'italic' }}>
          Hi, my name is Jubran Naser and this project is my final project for
          Vienna's UpLeveled fullstack web development bootcamp. If you're
          interested in finding more about the technologies used to create it
          and the planning that went into it, please visit the Burst Your Bubble
          GitHub repo{' '}
          <Link href="https://github.com/Jubali-Khan/burst-your-bubble">
            <a>https://github.com/Jubali-Khan/burst-your-bubble</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getRoleByToken, getUserinfoByToken } = await import(
    '../util/database'
  );
  const sessionToken = context.req.cookies.sessionToken;
  const userType = await getRoleByToken(sessionToken);
  console.log('userType in gSSP index: ', userType);

  if (!userType) {
    // someone just browing, not admin nor user
    return {
      props: {},
    };
  }

  if (userType.role === 1) {
    return {
      props: {
        userType: 'admin',
      },
    };
  }
  const userInfo = await getUserinfoByToken(sessionToken);

  if (userType.role === 2) {
    return {
      props: {
        userType: 'user',
        userInfo: userInfo,
      },
    };
  }
}
