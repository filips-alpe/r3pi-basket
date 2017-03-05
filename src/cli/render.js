import { println } from '../utils/cli';

export default function render(state) {
  println(JSON.stringify(state));
}
