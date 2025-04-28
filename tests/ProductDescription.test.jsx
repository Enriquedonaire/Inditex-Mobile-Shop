import { render, screen } from '@testing-library/react';
import ProductDescription from '../src/components/ProductDescription';

describe('ProductDescription', () => {
  it('renderiza los detalles del producto', () => {
    const product = {
      brand: 'Apple',
      model: 'iPhone 12',
      price: 999,
      cpu: 'A14',
      ram: '4GB',
      os: 'iOS',
      displayResolution: '1170x2532',
      battery: '2815mAh',
      primaryCamera: ['12MP'],
      secondaryCmera: '12MP',
      dimentions: '146.7 x 71.5 x 7.4 mm',
      weight: 164
    };
    render(<ProductDescription product={product} />);
    expect(screen.getByText(/Apple iPhone 12/)).toBeInTheDocument();
    expect(screen.getByText('$999')).toBeInTheDocument();
    expect(screen.getByText('A14')).toBeInTheDocument();
    expect(screen.getByText('4GB')).toBeInTheDocument();
    expect(screen.getByText('iOS')).toBeInTheDocument();
    expect(screen.getByText('1170x2532')).toBeInTheDocument();
    expect(screen.getByText('2815mAh')).toBeInTheDocument();
    expect(screen.getAllByText('12MP').length).toBeGreaterThan(1);
    expect(screen.getByText('146.7 x 71.5 x 7.4 mm')).toBeInTheDocument();
    expect(screen.getByText('164g')).toBeInTheDocument();
  });

  it('renderiza null si no hay producto', () => {
    const { container } = render(<ProductDescription product={null} />);
    expect(container.firstChild).toBeNull();
  });
});