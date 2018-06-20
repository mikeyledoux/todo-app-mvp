import React from 'react';
import { api } from '../helpers/api';
import Header from './header';

/**
 * Prop Types
 * @private
 */
const propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

/**
 * App component
 * @returns {ReactElement}
 */
const App = ({ children }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'app';
  const updateTodos = todos => {
    todos = JSON.parse(todos);
    location.href="/archived";
  };

  const archiveAll = todo => {
    api('PUT', { id: 0 }, function(resp) {
      updateTodos(JSON.stringify(resp));
    }, 'archiveall');
  };

  return (
    <div className={baseCls}>
      <Header onArchiveAll={archiveAll} />
      {children}
    </div>
  );
};

App.propTypes = propTypes;

export default App;
