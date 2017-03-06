import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import Checkout from '../components/Checkout';
import Messages from './Messages';
import { addToBasket, removeFromBasket, clearBasket } from '../ducks/basket';

const style = {
  position: 'absolute',
  height: '100%',
  width: '100%',
};

export const AppContainer = props => (
  <div style={style}>
    <Header />
    <ProductList
      products={props.products}
      selected={props.selection.items}
      addToBasket={props.addToBasket}
      removeFromBasket={props.removeFromBasket}
    />
    <Checkout
      products={props.products}
      selection={props.selection}
      removeFromBasket={props.removeFromBasket}
      clearBasket={props.clearBasket}
    />
    <Messages />
  </div>
);

AppContainer.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      label: PropTypes.string,
    }),
  ).isRequired,
  selection: PropTypes.shape({
    price: PropTypes.number,
    items: PropTypes.object,
  }).isRequired,
  addToBasket: PropTypes.func.isRequired,
  removeFromBasket: PropTypes.func.isRequired,
  clearBasket: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    selection: state.getIn(['basket', 'selection']).toJS(),
    products: state.getIn(['basket', 'products']).toJS(),
  }),
  dispatch => ({
    addToBasket: item => dispatch(addToBasket(item)),
    removeFromBasket: item => dispatch(removeFromBasket(item)),
    clearBasket: () => dispatch(clearBasket()),
  }),
)(AppContainer);
