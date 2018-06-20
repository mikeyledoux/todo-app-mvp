import React from 'react';
import { Link } from 'react-router';

/**
 * Header component
 */
const Header = ({onArchiveAll}) => {
  /**
   * Base CSS class
   * @returns {ReactElement}
   */
  const baseCls = 'header';

  return (
    <div className={baseCls}>
      <Link to="/">MyTodos</Link>
      <span className={'btn btn-xs btn-success top-archive'} onClick={onArchiveAll}>Archive all completed</span>
    </div>
  )
};

export default Header;
