import React, { PropTypes } from 'react';
import apple from './images/apple.jpg';
import banana from './images/banana.jpg';
import orange from './images/orange.jpg';
import papaya from './images/papaya.jpg';

const images = { apple, banana, orange, papaya };

class ProductComponent extends React.PureComponent {
  constructor() {
    super();
    this.addToBasket = this.addToBasket.bind(this);
    this.removeFromBasket = this.removeFromBasket.bind(this);
  }

  addToBasket() {
    this.props.addToBasket(this.props.product.name);
  }

  removeFromBasket() {
    this.props.removeFromBasket(this.props.product.name);
  }

  render() {
    const { product, amount } = this.props;
    return (
      <div>
        <div key={product.name}>
          <img src={images[product.name]} alt={product.name} style={{ width: 100 }} />
          {product.label} - $ {(product.price / 100).toFixed(2)}
          <button onClick={this.addToBasket}>
            Add to basket
          </button>
          {amount > 0 && <button onClick={this.removeFromBasket}>
            Remove
          </button>}
        </div>
      </div>
    );
  }
}

ProductComponent.defaultProps = {
  amount: 0,
};

ProductComponent.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    label: PropTypes.string,
  }).isRequired,
  amount: PropTypes.number,
  addToBasket: PropTypes.func.isRequired,
  removeFromBasket: PropTypes.func.isRequired,
};

export default ProductComponent;
