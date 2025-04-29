import { render, screen } from '@testing-library/react';
import ProductCard from '../src/components/ProductCard';

describe('ProductCard Component', () => {
  it('renders without crashing', () => {
    render(<ProductCard product={{ brand: 'Test Brand', price: 100 }} />);
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
    expect(screen.getByText('Unknown Model')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });
});

describe('ProductCard', () => {
  it('renderiza sin errores', () => {
    render(<ProductCard product={{}} />);
  });
});