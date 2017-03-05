import { fromJS, Map } from 'immutable';

const ADD_TO_BASKET = 'r3pi/basket/ADD';
const REMOVE_FROM_BASKET = 'r3pi/basket/REMOVE';
const CLEAR_BASKET = 'r3pi/basket/CLEAR';

const initialState = fromJS({
  products: [
    { name: 'orange', price: 0.30, label: 'Orange' },
    { name: 'banana', price: 0.15, label: 'Banana' },
    { name: 'apple', price: 0.25, label: 'Apple' },
    { name: 'papaya', price: 0.50, label: 'Papaya' },
  ],
  promotions: [
    { product: 'papaya', amount: 3, discount: 0.50 },
  ],
  selection: {
    items: {},
    price: 0,
  },
});

function updatePrice(state) {
  const products = state.get('products');

  const price = state.getIn(['selection', 'items']).reduce((sum, amount, name) => {
    const itemPrice = products.find(p => p.get('name') === name).get('price', 0);

    let productPrice = (itemPrice * amount);

    const promotion = state.get('promotions').find(pr => pr.get('product') === name);

    if (promotion) {
      productPrice -= Math.floor(amount / promotion.get('amount')) * promotion.get('discount');
    }

    return sum + productPrice;
  }, 0);

  return state.setIn(['selection', 'price'], price);
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_BASKET:
      if (state.get('products').filter(p => p.get('name') === action.product).size === 0) {
        return state;
      }
      return updatePrice(state.updateIn(
        ['selection', 'items', action.product],
        num => (num || 0) + 1,
      ));
    case REMOVE_FROM_BASKET:
      if (state.get('products').filter(p => p.get('name') === action.product).size === 0) {
        return state;
      }
      return updatePrice(state.updateIn(
        ['selection', 'items', action.product],
        num => (num || 0) - 1,
      ));
    case CLEAR_BASKET:
      return state
        .setIn(['selection', 'items'], Map())
        .setIn(['selection', 'price'], 0);
    default:
      return state;
  }
}

export function addToBasket(product) {
  return { type: ADD_TO_BASKET, product };
}

export function removeFromBasket(product) {
  return { type: REMOVE_FROM_BASKET, product };
}

export function clearBasket() {
  return { type: CLEAR_BASKET };
}
