// component should be clickable in both news info sections to redirect to their links
// component should show basic info pulled from the events table

import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

const containerStyles = css`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: stretch;
  align-content: stretch;

  border: 1px black solid;
  border-radius: 10px;
`;
const titleStyles = css`
  margin: 0.6% 1%;
`;

const newsInfoSectionStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const firstDivStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  :hover {
    background-color: lightgray;
  }
`;

export default function Event(props) {
  return (
    <div css={containerStyles}>
      <section css={titleStyles}>{props.event.eventTitle}</section>
      <section css={newsInfoSectionStyles}>
        <section id="LWnewsSection">
          <Link href={props.event.leftLink}>
            <div css={firstDivStyle}>
              <Image src="/../public/favicon.ico" width="50px" height="50px" />
              <h4>{props.event.leftHeadline}</h4>
            </div>
          </Link>
          <div>By: {props.event.leftAuthorS}</div>
        </section>
        <section id="RWnewsSection">
          <Link href={props.event.rightLink}>
            <div css={firstDivStyle}>
              <Image src="/../public/favicon.ico" width="50px" height="50px" />
              <h4>{props.event.rightHeadline}</h4>
            </div>
          </Link>
          <div>By: {props.event.rightAuthorS}</div>
        </section>
      </section>
    </div>
  );
}
