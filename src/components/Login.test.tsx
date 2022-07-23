import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login from './Login';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: () => ({
      data: { id: 1, name: 'John' },
    }),
  },
}));

describe('first rendered', () => {
  test('username input should be rendered', () => {
    render(<Login />);
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    expect(usernameInputEl).toBeInTheDocument();
  });

  test('password input should be rendered', () => {
    render(<Login />);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
    expect(passwordInputEl).toBeInTheDocument();
  });

  test('button should be rendered', () => {
    render(<Login />);
    const buttonEl = screen.getByRole('button');
    expect(buttonEl).toBeInTheDocument();
  });

  test('username input should be empty', () => {
    render(<Login />);
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    expect(usernameInputEl.textContent).toBe('');
  });

  test('password input should be empty', () => {
    render(<Login />);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
    expect(passwordInputEl.textContent).toBe('');
  });

  test('button should be disabled', () => {
    render(<Login />);
    const buttonEl = screen.getByRole('button');
    expect(buttonEl).toBeDisabled();
  });
});

describe('input change', () => {
  test('username input should be change', () => {
    render(<Login />);
    const usernameInputEl: HTMLInputElement =
      screen.getByPlaceholderText(/username/i);
    const testValue = 'test';

    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    expect(usernameInputEl.value).toBe(testValue);
  });

  test('password input should be change', () => {
    render(<Login />);
    const passwordInputEl: HTMLInputElement =
      screen.getByPlaceholderText(/password/i);
    const testValue = 'test';

    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    expect(passwordInputEl.value).toBe(testValue);
  });

  test('button should not be disabled when inputs exist', () => {
    render(<Login />);
    const buttonEl = screen.getByRole('button');
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);

    const testValue = 'test';
    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });

    expect(buttonEl).not.toBeDisabled();
  });
});

describe('when button click', () => {
  test('loading should be rendered when click', () => {
    render(<Login />);
    const buttonEl = screen.getByRole('button');
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);

    const testValue = 'test';
    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    fireEvent.click(buttonEl);

    expect(buttonEl).toHaveTextContent(/wait/i);
  });

  test('loading should not be rendered after fetching', async () => {
    render(<Login />);
    const buttonEl = screen.getByRole('button');
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);

    const testValue = 'test';
    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    fireEvent.click(buttonEl);

    await waitFor(() => expect(buttonEl).not.toHaveTextContent(/wait/i));
  });

  test('username should be rendered after fetching', async () => {
    render(<Login />);
    const buttonEl = screen.getByRole('button');
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);

    const testValue = 'test';
    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    fireEvent.click(buttonEl);

    const userItem = await screen.findByText('John');

    expect(userItem).toBeInTheDocument();
  });
});
