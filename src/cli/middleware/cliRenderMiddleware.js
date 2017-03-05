import render from '../render';

export default function cliRenderMiddleware(store) {
  return next => (action) => {
    const prevState = store.getState();
    const result = next(action);
    const newState = store.getState();

    if (prevState !== newState) {
      render(store.getState());
    }

    return result;
  };
}
