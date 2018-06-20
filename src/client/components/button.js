import React from 'react';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  onClick: React.PropTypes.func,
  text: React.PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  onClick: noop,
  text: '',
};

/**
 * Button component
 * @returns {ReactElement}
 */
const Button = ({ text, onClick }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'delete glyphicon glyphicon-remove';

  return (
    <span className={baseCls} onClick={onClick}></span>
  )
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
