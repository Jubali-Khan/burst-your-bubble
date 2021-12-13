import { css } from '@emotion/react';

const divStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;

  max-height: 20vh;
  background-color: white;
  padding: 1%;
  margin: 0.5%;

  border: 1px solid grey;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  span {
    margin: 0.5%;
  }

  select {
    margin: 0.5%;
    border: 1px solid grey;
    border-radius: 5px;

    width: 25%;
    height: 23px;
  }
  input {
    margin: 0.5%;
    border: 1px solid grey;
    border-radius: 5px;

    width: 30%;
    height: 19px;
  }
  button {
    margin: 1%;
    background-color: white;
    border: 1px solid grey;
    border-radius: 5px;

    height: 23px;
    :hover {
      background-color: #c5d0d5;
    }
  }
  .add {
    margin: 0.5%;
    padding: 0.4%;
    font-size: small;
    border-radius: 5px;

    :hover {
      background-color: lightgray;
    }
  }
  .cancel {
    margin: 0.5%;
    padding: 0.4%;
    border-radius: 5px;

    :hover {
      background-color: lightgray;
    }
  }
`;

const rowStyle = css`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`;

export default function EditSpace(props) {
  return (
    <div css={divStyle}>
      <form css={rowStyle} onSubmit={(e) => e.preventDefault()}>
        <span>I</span>
        <select
          value={props.verbChoice}
          onChange={(e) => {
            props.setVerbChoice(e.currentTarget.value);
          }}
        >
          <option value="believes">believe</option>
          <option value="thinks">think</option>
          <option value="agrees">agree</option>
          <option value="disagrees">disagree</option>
        </select>

        <input
          value={props.argument}
          onChange={(e) => props.setArgument(e.currentTarget.value)}
        />

        <select
          style={{ display: props.premiseDisplay }}
          value={props.conjChoice}
          onChange={(e) => props.setConjChoice(e.currentTarget.value)}
        >
          <option value="because">because</option>
          <option value="considering">considering</option>
          <option value="as">as</option>
          <option value="due to">due to</option>
          <option value="since">since</option>
        </select>
        <input
          style={{ display: props.premiseDisplay }}
          value={props.premise}
          onChange={(e) => props.setPremise(e.currentTarget.value)}
        />

        <button
          onClick={() => {
            props.setShowPremise(!props.showPremise);
          }}
        >
          {props.premisesDisplay === 'none' ? '+PREMISE' : '-'}
        </button>

        <button onClick={props.updateHandler}>UPDATE</button>
        <button
          onClick={() => {
            props.setEditingMode(false);
            props.cancelEditHandler();
          }}
        >
          &#10006;
        </button>
      </form>
    </div>
  );
}
