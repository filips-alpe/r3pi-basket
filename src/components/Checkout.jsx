import React, { PropTypes } from 'react';

const style = {
  padding: '2em',
};

const buttonStyle = {
  fontSize: '1.5em',
  padding: '0.5em',
  background: 'linear-gradient(to right, #fd5152, #F0CB35)',
  border: 0,
  borderRadius: 5,
};

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
        <code>{items[name]} x {this.getProduct(name).label}</code>
      </div>
    ));
  }

  render() {
    const { price } = this.props.selection;

    return (
      <div style={style}>
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
            <br />
            <code style={{ textDecoration: 'underline', fontSize: '1.2em' }}>
              Total: $ {(price / 100).toFixed(2)}
            </code>
            <br />
            <br />
            <button onClick={this.clearBasket} style={buttonStyle}>
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
