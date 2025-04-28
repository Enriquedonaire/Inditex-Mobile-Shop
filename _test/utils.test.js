
import { jest } from '@jest/globals';
import { formatPrice, debounce } from '../src/lib/utils';

describe('Utility Functions', () => {
  describe('formatPrice', () => {
    test('should format price correctly', () => {
      expect(formatPrice(1000)).toBe('$1,000.00');
      expect(formatPrice(999.99)).toBe('$999.99');
      expect(formatPrice(0)).toBe('$0.00');
    });
    
    test('should handle undefined or null values', () => {
      expect(formatPrice(undefined)).toBe('$0.00');
      expect(formatPrice(null)).toBe('$0.00');
    });
    
    test('should handle negative values', () => {
      expect(formatPrice(-100)).toBe('-$100.00');
    });
  });
  
  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    
    afterEach(() => {
      jest.useRealTimers();
    });
    
    test('should debounce function calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 500);
      
      
      debouncedFn();
      debouncedFn();
      debouncedFn();
      
      
      expect(mockFn).not.toHaveBeenCalled();
      
      
      jest.advanceTimersByTime(500);
      
      
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
    
    test('should pass arguments to debounced function', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 500);
      
      debouncedFn('test', 123);
      
      
      jest.advanceTimersByTime(500);
      
      
      expect(mockFn).toHaveBeenCalledWith('test', 123);
    });
  });
});