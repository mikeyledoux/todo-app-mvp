import React from 'react';
import { Link } from 'react-router';

import { api } from '../helpers/api';
import Button from './button';
import Navbar from './navbar';
import TodoForm from './todo-form';
import TodoLink from './todo-link';
import Todos from './todos';

/**
 * TodosPage component
 * @class
 */
class TodosPage extends React.Component {

  /**
   * Prop types
   * @static
   */
  static propTypes = {
    params: React.PropTypes.object,
  };

  /**
   * Constructor
   * @constructor
   *
   * @param  {object} props - Props
   */
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      filterBy: props.viewFilter,
    };

    this.viewFilter = props.viewFilter;
    this.addTodo = this.addTodo.bind(this);
    this.postTodo = this.postTodo.bind(this);
    this.setFilterBy = this.setFilterBy.bind(this);
    this.updateTodos = this.updateTodos.bind(this);
    this.completeAll = this.completeAll.bind(this);
    this.baseCls = 'todos-page container';
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    api('GET', null, this.updateTodos);
  }

  /**
   * Add todo
   *
   * @param  {string} text - Todo text
   */
  addTodo(text) {
    if (!text) {
      return;
    }

    api('POST', { text }, this.postTodo);
  }

  /**
   * Posts new todo to the todos collection
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  postTodo(json) {
    this.setState({
      todos: [...json],
    });
  }

  /**
   * Set filterBy state
   *
   * @param {string} filterBy - filterBy state
   */
  setFilterBy(filterBy) {
    this.setState({ filterBy });
  }

  /**
   * Update todos array state
   *
   * @param  {Array} todos - Array of todo objects
   */
  updateTodos(todos) {
    todos = JSON.parse(todos);
    this.setState({ todos });
    this.showActiveCount(this.state.todos);
  }
  showActiveCount(arr) {
    return this.showCount = arr.filter(function(item){return item.status !=='complete' && item.status !=='archive'}).length
  }
  completeAll() {
    let top = this;
    api('PUT', { id: 0 }, function(resp) {
      top.updateTodos(JSON.stringify(resp));
    }, 'completeall');
  }

  /**
   * Render
   * @returns {ReactElement}
   */
  render() {
    return (
      <div className={this.baseCls}>
        <Navbar filterBy={this.state.filterBy} onClickFilter={this.setFilterBy} />
        {this.showActiveCount(this.state.todos)} tasks remaining <Link onClick={this.completeAll} className={'completeLink'}>complete all</Link>
        <TodoForm onSubmit={this.addTodo} />

        <Todos
          filterBy={this.viewFilter}
          todos={this.state.todos}
          updateTodos={this.updateTodos}
          completeAll={this.completeAll}
        />
      </div>
    );
  }
}

export default TodosPage;
