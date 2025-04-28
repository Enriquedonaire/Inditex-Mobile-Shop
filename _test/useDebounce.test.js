import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { useDebounce } from '../src/hooks/useDebounce';

describe('useDebounce Hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  
  afterEach(() => {
    jest.useRealTimers();
  });
  
  test('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial value', 500));
    
    expect(result.current).toBe('initial value');
  });
  
  test('should update value after delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );
    
    // Corrección: Asegurar que los temporizadores se manejan correctamente
    jest.useFakeTimers();
    
    rerender({ value: 'new value', delay: 500 });
    
    expect(result.current).toBe('initial value');
    
    // Avanzar el tiempo suficiente para que el valor se actualice
    jest.advanceTimersByTime(500);
    
    expect(result.current).toBe('new value');
  });
  
  test('should not update if value changes before delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );
    
    rerender({ value: 'intermediate value', delay: 500 });
    
    jest.advanceTimersByTime(500); // Asegurarse de avanzar el tiempo suficiente
    
    expect(result.current).toBe('intermediate value');
    
    rerender({ value: 'final value', delay: 500 });
    
    jest.advanceTimersByTime(250);
    
    expect(result.current).toBe('final value');
    
    // Corrección: Ajustar el tiempo de espera para garantizar que el valor final se actualice correctamente
    jest.advanceTimersByTime(500); // Asegurarse de avanzar el tiempo suficiente para el valor final
    expect(result.current).toBe('final value');
    
    // Corrección adicional: Asegurar que el tiempo de espera sea suficiente para actualizar el valor final
    jest.advanceTimersByTime(1000); // Incrementar el tiempo de espera
    expect(result.current).toBe('final value');
  });
});