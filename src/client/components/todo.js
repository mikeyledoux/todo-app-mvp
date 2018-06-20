import React from 'react';

import Button from './button';
import TodoLink from './todo-link';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filtered: React.PropTypes.bool,
  onClickDelete: React.PropTypes.func,
  onClickComplete: React.PropTypes.func,
  onClickTodo: React.PropTypes.func,
  onClickArchive: React.PropTypes.func,
  status: React.PropTypes.string,
  text: React.PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filtered: false,
  onClickDelete: noop,
  onClickComplete: noop,
  onClickArchive: noop,
  onClickTodo: noop,
  status: '',
  text: '',
};

/**
 * Todo component
 * @returns {ReactElement}
 */
const Todo = ({ filtered, onClickDelete, onClickComplete, onClickArchive, onClickTodo, status, text }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todo';

  const todoCls = baseCls
    + ' todo--status-' + status
    + (filtered ? ' todo--filtered' : '');

    const disableCheck = status === 'complete' ? ' disabled' : '';

  return (
    <li className={todoCls}>
      <input type="checkbox" disabled={disableCheck} onChange={onClickComplete} />
      <TodoLink text={text} onClick={onClickTodo} />
      <a href="#" role="button" className={(status == 'complete') ? 'btn btn-xs btn-success' : 'hidden' } onClick={onClickArchive}>archive</a>
      <Button text="Delete" onClick={onClickDelete} />
    </li>
  );
}

Todo.propTypes = propTypes;
Todo.defaultProps = defaultProps;

export default Todo;
