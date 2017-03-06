import React, { PropTypes } from 'react';

class CheckoutComponent extends React.PureComponent {
  constructor() {
    super();
    this.renderItems = this.renderItems.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.clearBasket = this.clearBasket.bind(this);
  }

  getProduct(name) {
    return this.props.products.filter(p => p.name === name)[0];
  }

  clearBasket() {
    this.props.clearBasket();
  }

  renderItems() {
    const { items } = this.props.selection;
    const itemsInBasket = Object.keys(items).filter(k => items[k] !== 0);

    return itemsInBasket.map(name => (
      <div key={name}>
        {items[name]} x {this.getProduct(name).label}
      </div>
    ));
  }

  render() {
    const { price } = this.props.selection;

    return (
      <div>
        <h3>Your basket:</h3>
        {
          price > 0 ?
            this.renderItems() :
            <div>
              Your basket is currently empty.
          </div>
        }
        {price > 0 &&
          <div>
            Total: $ {(price / 100).toFixed(2)}
            <button onClick={this.clearBasket}>
              Clear basket
            </button>
          </div>
        }
      </div>
    );
  }
}

CheckoutComponent.propTypes = {
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
  clearBasket: PropTypes.func.isRequired,
};

export default CheckoutComponent;
