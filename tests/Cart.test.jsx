import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Cart from '../src/components/Cart';

describe('Cart', () => {
  it('renderiza sin errores', () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );
  });
});