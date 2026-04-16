import { Window } from 'uzumaki-ui';
import { render } from 'uzumaki-ui/react';
import { App } from './App';

const window = new Window('main', {
  width: 1100,
  height: 700,
  title: 'uzumaki — stress tester',
});

render(window, <App />);
