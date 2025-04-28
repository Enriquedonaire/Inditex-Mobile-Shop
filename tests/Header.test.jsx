import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../src/components/Header';

describe('Header Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});