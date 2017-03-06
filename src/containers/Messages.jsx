import React from 'react';
import { connect } from 'react-redux';

export const MessagesContainer = props => (
  <footer>
    {props.messages.map(msg => (
      <div key={msg}>{msg}</div>
    ))}
  </footer>
);

MessagesContainer.defaultProps = {
  messages: [],
};

MessagesContainer.propTypes = {
  messages: React.PropTypes.arrayOf(React.PropTypes.string),
};

export default connect(
  state => ({
    messages: state.get('messages').toJS(),
  }),
)(MessagesContainer);
