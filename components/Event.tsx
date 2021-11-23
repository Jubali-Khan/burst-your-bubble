import { css } from '@emotion/react';
import Link from 'next/link';

const containerStyles = css`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: stretch;
  align-content: stretch;

  background-color: #faf9f4;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  border: 1px solid #999;
  border-radius: 10px;
  max-width: 80vw;

  margin: 1% 6.2%;
  padding: 1%;

  a {
    text-decoration: none;
    color: inherit;
    :hover {
      background-color: #f7ecd2;
      border-radius: 10px;
      text-decoration: underline;
    }
  }
  a[target='_blank']::after {
    content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg==);
    margin: 0px 3px 0px 5px;
  }
`;

const titleStyles = css`
  margin: 0.6% 1%;
`;

const subTitleStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const rowStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-align: left;
`;
type EventType = {
  id: number;
  eventTitle: string;
  leftLogo: string;
  leftLink: string;
  leftHeadline: string;
  leftAuthorS: string;
  rightLogo: string;
  rightLink: string;
  rightHeadline: string;
  rightAuthorS: string;
  eventLink: string;
};
type Props = {
  event: EventType;
  textSize: string;
};

export default function Event(props: Props) {
  return (
    <div css={containerStyles} style={{ fontSize: props.textSize }}>
      <h4 css={titleStyles}>{props.event.eventTitle}</h4>
      <section css={subTitleStyles}>
        <section css={subTitleStyles}>
          <div css={rowStyles}>
            <Link href={props.event.eventLink}>
              <a style={{ width: '45%', fontStyle: 'italic' }} target="_blank">
                {/* image */}
                <p>{props.event.leftHeadline}</p>
              </a>
            </Link>
            <Link href={props.event.eventLink}>
              <a style={{ width: '45%', fontStyle: 'italic' }} target="_blank">
                {/* image */}
                <p>{props.event.rightHeadline}</p>
              </a>
            </Link>
          </div>
          <div css={rowStyles}>
            <div style={{ width: '45%' }}>By: {props.event.leftAuthorS}</div>

            <div style={{ width: '45%' }}>By: {props.event.rightAuthorS}</div>
          </div>
        </section>
      </section>
    </div>
  );
}
