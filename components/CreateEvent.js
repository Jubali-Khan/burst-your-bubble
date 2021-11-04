import { css } from '@emotion/react';
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

export default function CreateEvent() {
  // State variables
  const [eventTitle, setEventTitle] = useState('');

  const [leftLogo, setLeftLogo] = useState('');
  const [leftLink, setLeftLink] = useState('');
  const [leftHeadline, setLeftHeadline] = useState('');
  const [leftAuthorS, setLeftAuthorS] = useState('');

  const [rightLogo, setRightLogo] = useState('');
  const [rightLink, setRightLink] = useState('');
  const [rightHeadline, setRightHeadline] = useState('');
  const [rightAuthorS, setRightAuthorS] = useState('');

  const [eventLink, setEventLink] = useState('');

  const [leftArticle, setLeftArticle] = useState('');
  const [rightArticle, setRightArticle] = useState('');

  const [messages, setMessages] = useState([]);

  async function publishHandler() {
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
    const statusJson = await response.json();

    console.log('statusJson: ', statusJson);
    // setMessages([statusJson]);

    // if there's an error in the response from the api ..
    if ('errors' in statusJson) {
      setMessages(statusJson.errors);
      return;
    }
    // if everything's alright..
  }

  return (
    <form
      css={formStyles}
      onSubmit={async (event) => {
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
        {/* <input placeholder="Add left article" />
        <input placeholder="Add right article" /> */}
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
        <div>
          {messages.map((message) => (
            <li key={`mess-${message}`}>{message}</li>
          ))}
        </div>
      </section>
    </form>
  );
}
