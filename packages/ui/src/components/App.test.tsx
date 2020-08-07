import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CasperContainer from '../containers/CasperContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App container={new CasperContainer()} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
