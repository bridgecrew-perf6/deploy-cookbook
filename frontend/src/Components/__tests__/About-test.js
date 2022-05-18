import {screen, render} from '@testing-library/react';
import About from '../About';

it('About contains the about text', () => {
  render(<About/>);
  const aboutTitleElement = screen.getByText(/about cookbook/i);
  expect(aboutTitleElement).toBeInTheDocument();
});
