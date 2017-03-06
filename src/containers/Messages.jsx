import React from 'react';
import { connect } from 'react-redux';

const style = {
  marginTop: '2em',
};

const msgStyle = {
  padding: '1em',
  background: '#ffff9a',
  border: '2px solid green',
  fontWeight: 'bold',
  textAlign: 'center',
};

export const MessagesContainer = props => (
  <footer style={style}>
    {props.messages.map(msg => (
      <div key={msg} style={msgStyle}>{msg}</div>
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
