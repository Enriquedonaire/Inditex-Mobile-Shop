import { jest } from '@jest/globals';
import { fetchProducts, fetchProductDetails, addToCart } from '../src/services/api';

describe('API Services', () => {
  beforeEach(() => {
    
    jest.clearAllMocks();
    localStorage.clear();
    
    
    global.fetch.mockReset();
  });
  
  describe('fetchProducts', () => {
    test('should fetch products from API when no cache exists', async () => {
      const mockProducts = [
        { id: '1', brand: 'Apple', model: 'iPhone 12', price: 999 }
      ];
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts
      });
      
      const result = await fetchProducts();
      
      expect(result).toEqual(mockProducts);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://itx-frontend-test.onrender.com/api/product'
      );
      expect(localStorage.setItem).toHaveBeenCalled();
    });
    
    test('should return cached products when valid cache exists', async () => {
      const mockProducts = [
        { id: '1', brand: 'Apple', model: 'iPhone 12', price: 999 }
      ];
      
      
      localStorage.getItem.mockReturnValueOnce(JSON.stringify({
        data: mockProducts,
        timestamp: Date.now()
      }));
      
      const result = await fetchProducts();
      
      expect(result).toEqual(mockProducts);
      expect(global.fetch).not.toHaveBeenCalled();
    });
    
    test('should fetch new data when cache is expired', async () => {
      const mockProducts = [
        { id: '1', brand: 'Apple', model: 'iPhone 12', price: 999 }
      ];
      
      
      localStorage.getItem.mockReturnValueOnce(JSON.stringify({
        data: mockProducts,
        timestamp: Date.now() - 3600001 
      }));
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts
      });
      
      await fetchProducts();
      
      expect(global.fetch).toHaveBeenCalled();
    });
    
    test('should handle API errors', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      });
      
      await expect(fetchProducts()).rejects.toThrow('HTTP error! Status: 500');
    });
  });
  
  describe('fetchProductDetails', () => {
    test('should fetch product details from API when no cache exists', async () => {
      const mockProduct = {
        id: '1',
        brand: 'Apple',
        model: 'iPhone 12',
        price: 999
      };
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProduct
      });
      
      const result = await fetchProductDetails('1');
      
      expect(result).toEqual(mockProduct);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://itx-frontend-test.onrender.com/api/product/1'
      );
    });
  });
  
  describe('addToCart', () => {
    test('should post data to API and return response', async () => {
      const mockResponse = { count: 1 };
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });
      
      const result = await addToCart('1', 1, 1);
      
      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://itx-frontend-test.onrender.com/api/cart',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: '1', colorCode: 1, storageCode: 1 })
        })
      );
    });
  });
});