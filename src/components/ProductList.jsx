import React, { PropTypes } from 'react';
import Product from './Product';

const ProductList = props => (
  <div>
    <h3>We have the following products on sale today:</h3>
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
