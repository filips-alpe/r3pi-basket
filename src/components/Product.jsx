import React, { PropTypes } from 'react';
import apple from './images/apple.jpg';
import banana from './images/banana.jpg';
import orange from './images/orange.jpg';
import papaya from './images/papaya.jpg';

const images = { apple, banana, orange, papaya };

const style = {
  display: 'inline-block',
  width: '50%',
  minWidth: '250px',
  boxSizing: 'border-box',
  padding: '1rem',
  textAlign: 'center',
};

const imgStyle = {
  width: '80%',
  maxWidth: '200px',
  padding: '0 10%',
};

const buttonContainerStyle = {
  display: 'inline-block',
  width: '80%',
  minWidth: '200px',
};

const buttonGradients = {
  red: 'linear-gradient(to left, #ffd200, #f7971e)',
  green: 'linear-gradient(to left, #45b649, #dce35b)',
};

const buttonStyle = color => ({
  display: 'inline-block',
  width: '27%',
  margin: '0 3%',
  maxWidth: '100px',
  lineHeight: '1.5em',
  borderRadius: '5px',
  border: 0,
  fontSize: '2em',
  fontWeight: 'bold',
  background: buttonGradients[color],
});

const labelStyle = {
  display: 'inline-block',
  width: '33%',
  textAlign: 'center',
  verticalAlign: 'middle',
  fontSize: '1.2em',
};

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
      <div key={product.name} style={style}>
        <img src={images[product.name]} alt={product.name} style={imgStyle} />
        <div style={buttonContainerStyle}>
          <button onClick={this.removeFromBasket} style={buttonStyle('red')} disabled={amount === 0}>
            -
          </button>
          <div style={labelStyle}>
            <strong>
              {product.label}
            </strong>
            <br />
            <code>$ {(product.price / 100).toFixed(2)}</code>
          </div>
          <button onClick={this.addToBasket} style={buttonStyle('green')}>
            +
          </button>
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
