import { css } from '@emotion/react';
import Markdown from 'markdown-to-jsx';
import Image from 'next/image';
import { useState } from 'react';

const containerStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  margin: 1% 4%;
  padding: 1%;
  overflow: hidden;
`;

const fontsSection = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  max-width: 7vw;
  margin: 1%;

  border: 1px solid grey;
  border-radius: 10px;
  padding: 0.5%;
  button {
    width: 30px;
    height: 30px;
    font-size: 1.2em;
  }
`;

export default function Articles(props) {
  function textSizeIncrease() {
    if (props.counter > 5) {
      return;
    } else {
      let tempValue = props.textSize;
      // console.log('tempValue: ', tempValue);
      tempValue = tempValue.slice(0, -1);
      // console.log('tempValue: ', tempValue);
      tempValue = Number(tempValue);
      // console.log('tempValue: ', tempValue);
      tempValue = tempValue + 10;
      // console.log('tempValue: ', tempValue);
      tempValue = tempValue.toString();
      // console.log('tempValue: ', tempValue);
      tempValue = tempValue.concat('%');
      console.log('tempValue: ', tempValue);
      props.setTextSize(tempValue);
      props.setCounter(props.counter + 1);
    }
  }
  function textSizeDecrease() {
    if (props.counter <= -4) {
      return;
    } else {
      let tempValue = props.textSize;
      // console.log('tempValue: ', tempValue);
      tempValue = tempValue.slice(0, -1);
      // console.log('tempValue: ', tempValue);
      tempValue = Number(tempValue);
      // console.log('tempValue: ', tempValue);
      tempValue = tempValue - 10;
      // console.log('tempValue: ', tempValue);
      tempValue = tempValue.toString();
      // console.log('tempValue: ', tempValue);
      tempValue = tempValue.concat('%');
      console.log('tempValue: ', tempValue);
      props.setTextSize(tempValue);
      props.setCounter(props.counter - 1);
    }
  }

  const articleStyles = css`
    margin: 1.5%;
    max-width: 37vw;
    max-height: 80vh;

    background-color: #f6f2e9;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    padding: 0% 1%;
    border: 1px solid #999;
    border-radius: 5px;

    font-size: ${props.textSize};

    overflow: auto;
  `;
  return (
    <>
      <section css={fontsSection}>
        <Image src={'/../public/aA.jpg'} width="35px" height="30px" />
        <button onClick={textSizeDecrease}>-</button>
        <button onClick={textSizeIncrease}>+</button>
      </section>
      <div css={containerStyles}>
        <article css={articleStyles}>
          <Markdown>{props.articles.leftArt}</Markdown>
        </article>
        <article css={articleStyles}>
          <Markdown>{props.articles.rightArt}</Markdown>
        </article>
      </div>
    </>
  );
}
