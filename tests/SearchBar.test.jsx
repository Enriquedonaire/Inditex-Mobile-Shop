import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../src/components/SearchBar';

describe('SearchBar', () => {
  it('llama a onSearch con el valor debounced', () => {
    jest.useFakeTimers();
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);
    const input = screen.getByPlaceholderText(/search by brand or model/i);
    fireEvent.change(input, { target: { value: 'iphone' } });
    jest.advanceTimersByTime(300);
    expect(onSearch).toHaveBeenCalledWith('iphone');
    jest.useRealTimers();
  });
});
