import { css } from '@emotion/react';
import Markdown from 'markdown-to-jsx';
import { useState } from 'react';

const containerStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  margin: 1% 4%;
  padding: 1%;
  overflow: hidden;
`;

export default function Articles(props) {
  const [textSize, setTextSize] = useState('100%');
  const [counter, setCounter] = useState(1);
  function textSizeIncrease() {
    if (counter > 5) {
      return;
    } else {
      let tempValue = textSize;
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
      setTextSize(tempValue);
      setCounter(counter + 1);
    }
  }
  function textSizeDecrease() {
    if (counter <= -4) {
      return;
    } else {
      let tempValue = textSize;
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
      setTextSize(tempValue);
      setCounter(counter - 1);
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

    font-size: ${textSize};

    overflow: auto;
  `;
  return (
    <>
      <section>
        <div>change text size:</div>
        <button onClick={textSizeIncrease}>+</button>
        <button onClick={textSizeDecrease}>-</button>
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
