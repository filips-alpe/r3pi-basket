import { assert } from 'chai';
import { List, Map } from 'immutable';
import reducer, { addToBasket, removeFromBasket, clearBasket } from './basket';

describe('basket duck', () => {
  it('initializes the state with available products', () => {
    const state = reducer(undefined, {});
    assert.isDefined(state.get('products'), 'expected state to contain available products');
    assert(state.get('products') instanceof List, 'expected a list of available products');
  });

  it('initializes the state with an empty selection', () => {
    const state = reducer(undefined, {});
    const selection = state.get('selection');
    assert.isDefined(selection, 'expected selection to be initialized');
    assert.equal(selection.get('items'), Map(), 'expected the default selection to be an empty map');
    assert.equal(selection.get('price'), 0, 'expected initial price to be 0');
  });

  it('allows adding products to selection', () => {
    const state = reducer(undefined, addToBasket('apple'));
    assert.deepEqual(
      state.getIn(['selection', 'items']).toJS(),
      { apple: 1 },
      'expected apple to be added to the selection',
    );

    const nextState = reducer(state, addToBasket('orange'));
    assert.deepEqual(
      nextState.getIn(['selection', 'items']).toJS(),
      { apple: 1, orange: 1 },
      'expected apple to be added to the selection',
    );

    const finalState = reducer(nextState, addToBasket('apple'));
    assert.deepEqual(
      finalState.getIn(['selection', 'items']).toJS(),
      { apple: 2, orange: 1 },
      'expected apple to be added to the selection',
    );
  });

  it('does not add unavailable products to selection', () => {
    const state = reducer(undefined, addToBasket('pineapple'));
    assert.deepEqual(
      state.getIn(['selection', 'items']).toJS(),
      {},
      'expected pineapple not to be added to the selection',
    );
  });

  it('allows removing products from selection', () => {
    const state = reducer(
        reducer(
          reducer(undefined, addToBasket('apple')),
          addToBasket('orange'),
        ),
        addToBasket('apple'),
    );

    assert.deepEqual(
      reducer(state, removeFromBasket('orange')).getIn(['selection', 'items']).toJS(),
      { apple: 2, orange: 0 },
      'expected orange to be removed from selection',
    );
  });

  it('allows clearing the selection', () => {
    const state = reducer(
      reducer(
        reducer(undefined, addToBasket('apple')),
        addToBasket('orange'),
      ),
      addToBasket('apple'),
    );

    assert.deepEqual(
      reducer(state, clearBasket()).getIn(['selection', 'items']).toJS(),
      {},
      'expected selection to be cleared',
    );
  });

  it('calculates the total cost based on the selection', () => {
    const state = reducer(
      reducer(
        reducer(undefined, addToBasket('orange')),
        addToBasket('banana'),
      ),
      addToBasket('papaya'),
    );

    assert.equal(
      state.getIn(['selection', 'price']),
      0.3 + 0.15 + 0.5,
      'expected price to be properly calculated',
    );

    const nextState = reducer(state, removeFromBasket('banana'));
    assert.equal(
      nextState.getIn(['selection', 'price']),
      0.3 + 0.5,
      'expected price to be updated when a product is removed',
    );

    const finalState = reducer(state, clearBasket());
    assert.equal(
      finalState.getIn(['selection', 'price']),
      0,
      'expected price to 0 when selection is cleared',
    );
  });

  it('applies promotions to the total cost', () => {
    const state = reducer(
      reducer(undefined, addToBasket('papaya')),
      addToBasket('papaya'),
    );

    const nextState = reducer(state, addToBasket('papaya'));

    assert.equal(
      state.getIn(['selection', 'price']),
      nextState.getIn(['selection', 'price']),
      'expected the third papaya to be free',
    );
  });
});
