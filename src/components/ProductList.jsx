import React, { PropTypes } from 'react';
import Product from './Product';

const style = {
  border: '2px solid lightgray',
  borderRadius: 12,
  margin: '1em',
  background: '#fff',
};

const headingStyle = {
  textAlign: 'center',
  padding: '0 10px',
  color: '#00c4ff',
};

const ProductList = props => (
  <div style={style}>
    <h3 style={headingStyle}>
      We have the following products on sale today:
    </h3>
    {props.products.map(p => (
      <Product
        key={p.name}
        product={p}
        amount={props.selected[p.name]}
        addToBasket={props.addToBasket}
        removeFromBasket={props.removeFromBasket}
      />
    ))}
  </div>
);

ProductList.defaultProps = {
  selected: {},
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      label: PropTypes.string,
    }),
  ).isRequired,
  removeFromBasket: PropTypes.func.isRequired,
};

export default ProductList;
