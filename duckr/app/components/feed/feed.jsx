import React, { PropTypes } from 'react';
import { DuckContainer } from '../../containers';
import { newDuckContainer, header } from './styles.css';
import { errorMsg } from '../../sharedStyles/styles.css';
const { array, bool, func, string } = PropTypes;

NewDucksAvailable.propTypes = {
  handleClick: func.isRequired
};

Feed.propTypes = {
  duckIds: array.isRequired,
  error: string.isRequired,
  isFetching: bool.isRequired,
  newDucksAvailable: bool.isRequired,
  resetNewDucksAvailable: func.isRequired
};

function NewDucksAvailable({ handleClick }) {
  return (
    <div className={newDuckContainer} onClick={handleClick}>
      {'New Ducks Available'}
    </div>
  );
}

export default function Feed(props) {
  return props.isFetching === true
    ? <h1 className={header}>{'Fetching'}</h1>
    : <div>
      {props.newDucksAvailable
          ? <NewDucksAvailable handleClick={props.resetNewDucksAvailable} />
          : null}
      {props.duckIds.length === 0
          ? <p className={header}>
            {'This is unfortunate.'} <br /> {'It appears there are no ducks yet 😞'}
          </p>
          : null}
      {props.duckIds.map(id => <DuckContainer duckId={id} key={id} />)}
      {props.error ? <p className={errorMsg}>{props.error}</p> : null}
    </div>;
}
Feed.propTypes = {};
