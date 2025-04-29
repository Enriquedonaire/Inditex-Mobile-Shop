import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../src/components/Header';

describe('Header', () => {
  it('renderiza sin errores', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });
});