import { css } from '@emotion/react';
import Markdown from 'markdown-to-jsx';

const containerStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  margin: 1% 4%;
  padding: 1%;
  overflow: hidden;
`;

const articleStyles = css`
  margin: 1.5%;
  max-width: 37vw;
  max-height: 80vh;

  background-color: #f6f2e9;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  padding: 0% 1%;
  border: 1px solid #999;
  border-radius: 5px;

  overflow: auto;
`;

type Props = {
  articles: {
    id: number;
    leftArt: string;
    rightArt: string;
    eventId: number;
  };
  textSize: string;
};

export default function Articles(props: Props) {
  return (
    <div css={containerStyles}>
      <article css={articleStyles} style={{ fontSize: props.textSize }}>
        <Markdown>{props.articles.leftArt}</Markdown>
      </article>
      <article css={articleStyles} style={{ fontSize: props.textSize }}>
        <Markdown>{props.articles.rightArt}</Markdown>
      </article>
    </div>
  );
}
