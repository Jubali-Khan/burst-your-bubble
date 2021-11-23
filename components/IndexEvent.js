import { css } from '@emotion/react';

const containerStyles = css`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-around;

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
  }
`;
const titleStyles = css`
  margin: auto 1%;
`;

const subTitleStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const rowStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-align: left;
`;

export default function IndexEvent(props) {
  return (
    <div css={containerStyles}>
      <h4 css={titleStyles}>{props.event.eventTitle}</h4>
      <section css={subTitleStyles}>
        <div css={rowStyles}>
          {/* image */}
          <p style={{ width: '45%', fontStyle: 'italic' }}>
            {props.event.leftHeadline}
          </p>
          {/* image */}
          <p style={{ width: '45%', fontStyle: 'italic' }}>
            {props.event.rightHeadline}
          </p>
        </div>
        <div css={rowStyles}>
          <div style={{ width: '45%' }}>By: {props.event.leftAuthorS}</div>

          <div style={{ width: '45%' }}>By: {props.event.rightAuthorS}</div>
        </div>
      </section>
    </div>
  );
}
