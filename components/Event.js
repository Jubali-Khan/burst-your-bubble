// component should be clickable in both news info sections to redirect to their links
// component should show basic info pulled from the events table

import { css } from '@emotion/react';
import Link from 'next/link';

const newsInfoSectionStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const newsSectionStyle = css`
  margin: 1%;
  max-width: 35vw;
`;

const firstDivStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  :hover {
    background-color: lightgray;
    cursor: default;
    border-radius: 5px;
  }
`;

export default function Event(props) {
  const containerStyles = css`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: stretch;
    align-content: stretch;

    font-size: ${props.textSize};

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
    margin: 0.6% 1%;
  `;
  return (
    <div css={containerStyles}>
      <section css={titleStyles}>{props.event.eventTitle}</section>
      <section css={newsInfoSectionStyles}>
        <section css={newsSectionStyle} id="LWnewsSection">
          <Link href={props.event.leftLink}>
            <a target="_blank">
              <div css={firstDivStyle}>
                {/* image */}
                <h4>{props.event.leftHeadline}</h4>
              </div>
            </a>
          </Link>
          <div>By: {props.event.leftAuthorS}</div>
        </section>
        <section css={newsSectionStyle} id="RWnewsSection">
          <Link href={props.event.rightLink}>
            <a target="_blank">
              <div css={firstDivStyle}>
                {/* image */}
                <h4>{props.event.rightHeadline}</h4>
              </div>
            </a>
          </Link>
          <div>By: {props.event.rightAuthorS}</div>
        </section>
      </section>
    </div>
  );
}
