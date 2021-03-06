import { css } from '@emotion/react';
import Image from 'next/image';
import { useState } from 'react';

const formStyles = css`
  border: 1px black solid;
  border-radius: 10px;
  margin: 1% 5%;
  padding: 1%;
`;

const headlinesSectionStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  select {
    margin: 0 5% 5% 5%;
  }
`;

const headlineInfoStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 90%;
  margin: 1%;
`;

const articlesStyles = css`
  display: flex;
  flex-direction: row;
  textarea {
    margin: 1%;
    width: 90%;
    height: 60vh;
    border: 1px solid grey;
    border-radius: 4px;
    resize: none;
  }
`;

export default function CreateEvent(props) {
  // State variables
  const [eventTitle, setEventTitle] = useState();

  const [leftLogo, setLeftLogo] = useState(
    'https://res.cloudinary.com/dvnaeajid/image/upload/v1638126200/nytimes-logo-3_qy44aq.png',
  );
  const [leftLink, setLeftLink] = useState();
  const [leftHeadline, setLeftHeadline] = useState();
  const [leftAuthorS, setLeftAuthorS] = useState();

  const [rightLogo, setRightLogo] = useState(
    'https://res.cloudinary.com/dvnaeajid/image/upload/v1638126200/nytimes-logo-3_qy44aq.png',
  );
  const [rightLink, setRightLink] = useState();
  const [rightHeadline, setRightHeadline] = useState();
  const [rightAuthorS, setRightAuthorS] = useState();

  const [leftArticle, setLeftArticle] = useState();
  const [rightArticle, setRightArticle] = useState();

  async function publishHandler() {
    const inputArray = [
      eventTitle,
      leftLogo,
      leftLink,
      leftHeadline,
      leftAuthorS,
      rightLogo,
      rightLink,
      rightHeadline,
      rightAuthorS,
      leftArticle,
      rightArticle,
    ];
    const undefinedElementIndex = inputArray.indexOf(undefined);
    if (undefinedElementIndex > -1) {
      return;
    }
    // set event link to title where empty spaces are replaced with underscores
    const eventLink = eventTitle.replaceAll(' ', '_');
    console.log('eventLink: ', eventLink);

    // ping API /api/events/create
    const response = await fetch('/api/events/create', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        eventTitle,
        leftLogo,
        leftLink,
        leftHeadline,
        leftAuthorS,
        rightLogo,
        rightLink,
        rightHeadline,
        rightAuthorS,
        eventLink,
        leftArticle,
        rightArticle,
      }),
    });
    if (response.status === 403) {
      console.log('response status is 403');
      props.setRefresher(true);
    }
    const statusJson = await response.json();
    console.log('statusJson: ', statusJson);

    // if there's an error in the response from the api ..
    if ('errors' in statusJson) {
      if (response.status === 400) {
        console.log('response status is 400');
        props.setErrors(statusJson.errors);
        return;
      }
      return;
    }
    console.log('statusJson.event: ', statusJson.event);
    props.setErrors('Event created successfully!');
  }

  return (
    <form
      css={formStyles}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <section id="title">
        <input
          value={eventTitle}
          onChange={(e) => setEventTitle(e.currentTarget.value)}
          placeholder="Add title.."
          style={{ width: '82.5vw' }}
          required
        />
      </section>
      <section id="headlines" css={headlinesSectionStyles}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '60px',
            height: '60px',
            margin: 'auto',
          }}
        >
          <select
            value={leftLogo}
            onChange={(e) => setLeftLogo(e.currentTarget.value)}
          >
            <option value="https://res.cloudinary.com/dvnaeajid/image/upload/v1638126200/nytimes-logo-3_qy44aq.png">
              NYT
            </option>
            <option value="https://res.cloudinary.com/dvnaeajid/image/upload/v1638126200/Washington-Post_anmuvo.png">
              WP
            </option>
            <option value="https://res.cloudinary.com/dvnaeajid/image/upload/v1638126200/cnn_sbrt9r.png">
              CNN
            </option>
            <option value="https://res.cloudinary.com/dvnaeajid/image/upload/v1638126200/theguardian_logo_circ-170x170_kfxb3q.png">
              Guardian
            </option>
            <option value="https://res.cloudinary.com/dvnaeajid/image/upload/v1638126020/android-chrome-192x192_n8buqf.png">
              WJS
            </option>
            <option value="https://res.cloudinary.com/dvnaeajid/image/upload/v1638125844/daf73323b61005dc2b002a2ce3512e4f_c9iwu3.jpg">
              Fox
            </option>
            <option value="https://res.cloudinary.com/dvnaeajid/image/upload/v1638130892/npr-logo-square_tfu18o.webp">
              NPR
            </option>
          </select>
          <Image src={leftLogo} width="100px" height="80px" />
        </div>
        <div css={headlineInfoStyle}>
          <input
            value={leftLink}
            onChange={(e) => setLeftLink(e.currentTarget.value)}
            placeholder="Add 1st link.."
            required
          />
          <input
            value={leftHeadline}
            onChange={(e) => setLeftHeadline(e.currentTarget.value)}
            placeholder="Add 1st headline.."
            required
          />
          <input
            value={leftAuthorS}
            onChange={(e) => setLeftAuthorS(e.currentTarget.value)}
            placeholder="Add author(s) names"
            required
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '60px',
            height: '60px',
            margin: 'auto',
          }}
        >
          <select
            value={rightLogo}
            onChange={(e) => setRightLogo(e.currentTarget.value)}
          >
            <option value="https://res.cloudinary.com/dvnaeajid/image/upload/v1638126200/nytimes-logo-3_qy44aq.png">
              NYT{' '}
            </option>
            <option value="https://res.cloudinary.com/dvnaeajid/image/upload/v1638126200/Washington-Post_anmuvo.png">
              WP{' '}
            </option>
            <option value="https://res.cloudinary.com/dvnaeajid/image/upload/v1638126200/cnn_sbrt9r.png">
              CNN
            </option>
            <option value="https://res.cloudinary.com/dvnaeajid/image/upload/v1638126200/theguardian_logo_circ-170x170_kfxb3q.png">
              Guardian
            </option>
            <option value="https://res.cloudinary.com/dvnaeajid/image/upload/v1638126020/android-chrome-192x192_n8buqf.png">
              WSJ
            </option>
            <option value="https://res.cloudinary.com/dvnaeajid/image/upload/v1638125844/daf73323b61005dc2b002a2ce3512e4f_c9iwu3.jpg">
              Fox
            </option>
            <option value="https://res.cloudinary.com/dvnaeajid/image/upload/v1638130892/npr-logo-square_tfu18o.webp">
              NPR
            </option>
          </select>
          <Image src={rightLogo} width="100px" height="80px" />
        </div>
        <div css={headlineInfoStyle}>
          <input
            value={rightLink}
            onChange={(e) => setRightLink(e.currentTarget.value)}
            placeholder="Add 2nd link.."
            required
          />
          <input
            value={rightHeadline}
            onChange={(e) => setRightHeadline(e.currentTarget.value)}
            placeholder="Add 2nd headline.."
            required
          />
          <input
            value={rightAuthorS}
            onChange={(e) => setRightAuthorS(e.currentTarget.value)}
            placeholder="Add author(s) names"
            required
          />
        </div>
      </section>
      <hr />
      <section id="articles" css={articlesStyles}>
        <textarea
          value={leftArticle}
          onChange={(e) => setLeftArticle(e.currentTarget.value)}
          placeholder="Add left article"
          required
        />
        <textarea
          value={rightArticle}
          onChange={(e) => setRightArticle(e.currentTarget.value)}
          placeholder="Add right article"
          required
        />
      </section>
      <hr />
      <section id="publish">
        <button onClick={publishHandler}>PUBLISH</button>
      </section>
    </form>
  );
}
