import configureStore from './store';

export default function run() {
  const store = configureStore();
  console.log('Welcome!');
}
