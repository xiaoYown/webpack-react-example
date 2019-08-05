import 'react';
import { render } from 'react-dom';
import routers from './routers';

import '@/assets/sass/home/main.scss';

render(
  routers,
  document.getElementById('g-home')
);

if (module.hot) {
  module.hot.accept();
}