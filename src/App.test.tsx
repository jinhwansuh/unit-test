import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders 3 list items', () => {
  render(<App />);
  const listItems = screen.getAllByRole('listitem');
  expect(listItems).toHaveLength(3); //toBe, toEqual
});
test('renders title', () => {
  render(<App />);
  const title = screen.getByTestId('testid1');
  expect(title).toBeInTheDocument();
});
test('sum should be 5', () => {
  render(<App />);
  const sum = screen.getByTitle('sum');
  expect(sum.textContent).toBe('5');
});
