import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from '../src/pages/NotFoundPage';

describe('NotFoundPage', () => {
  it('renderiza sin errores', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
  });
});