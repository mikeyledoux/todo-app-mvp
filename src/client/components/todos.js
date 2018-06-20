import React from 'react';
import { api } from '../helpers/api';
import Todo from './todo';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: React.PropTypes.string,
  todos: React.PropTypes.arrayOf(React.PropTypes.object),
  updateTodos: React.PropTypes.func,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: '',
  todos: [],
  updateTodos: noop,
};

/**
 * Todos component
 * @returns {ReactElement}
 */
const Todos = ({ filterBy, todos, updateTodos }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todos';

  const onClickDelete = todo => {
    api('DELETE', todo, function(resp) {
      updateTodos(JSON.stringify(resp));
    });
  };
  const onClickComplete = todo => {
    api('PUT', todo, function(resp) {
      updateTodos(JSON.stringify(resp));
    }, 'complete');
  };

  const onClickArchive = todo => {
    if (todo.status != 'complete')
      alert('Sorry, you can\'t delete incomplete todo\'s.');
    else {
      api('PUT', todo, function(resp) {
        updateTodos(JSON.stringify(resp));
      }, 'archive');
    }
  };

  /**
   * Click handler for clicking on the todo
   * Toggles status state of Todo
   *
   * @param {object} todo - Todo object
   */
  const onClickTodo = todo => {
    const newTodo = Object.assign({}, todo);
    newTodo.status = todo.status === 'complete' ? 'active' : 'complete';
    newTodo.archive = false;

    api('PUT', newTodo, putTodo);
  }

  /**
   * Renders All Todos
   *
   * @returns {Array} - Returns an array of Todo React Elements
   */
  const renderTodos = () => {
    return todos.map(todo => {
      let filtered;
      switch (filterBy) {
        case 'active':
          filtered = todo.status !== 'active';
          break;
        case 'completed':
          filtered = todo.status !== 'complete';
          break;
        case 'archived':
          filtered = todo.status !== 'archive';
        break;
        default:
          filtered = false;
      }

      return (
        <Todo
          key={todo.id}
          filtered={filtered}
          onClickDelete={onClickDelete.bind(this, todo)}
          onClickComplete={onClickComplete.bind(this, todo)}
          onClickTodo={onClickTodo.bind(this, todo)}
          onClickArchive={onClickArchive.bind(this, todo)}
          status={todo.status}
          text={todo.text}
        />
      );
    })
  }

  return (
    <ul className={baseCls}>
      {renderTodos()}
    </ul>
  )
};

Todos.propTypes = propTypes;
Todos.defaultProps = defaultProps;

export default Todos;
