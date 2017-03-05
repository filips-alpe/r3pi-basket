import configureStore from './store';
import cliRenderMiddleware from './cli/middleware/cliRenderMiddleware';

export default function run() {
  const store = configureStore(undefined, [cliRenderMiddleware]);
  process.stdout.write('Welcome!');
}
