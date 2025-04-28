import { jest } from '@jest/globals';
import { fetchProducts, fetchProductDetails, addToCart } from '../src/services/api';
import 'jest'; // Ensure jest is available for testing

describe('API Services', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    localStorage.clear();
  });

  it('fetchProducts: obtiene productos de la API y usa caché', async () => {
    const mockProducts = [{ id: '1', brand: 'Apple', model: 'iPhone 12', price: 999 }];
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts
    });
    const result = await fetchProducts();
    expect(result).toEqual(mockProducts);
    expect(global.fetch).toHaveBeenCalled();
    global.fetch.mockClear();
    const result2 = await fetchProducts();
    expect(result2).toEqual(mockProducts);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('fetchProductDetails: obtiene detalles de producto', async () => {
    const mockProduct = { id: '1', brand: 'Apple', model: 'iPhone 12', price: 999 };
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

  it('addToCart: realiza POST y retorna respuesta', async () => {
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

  it('fetchProducts: maneja errores de API', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, status: 500 });
    await expect(fetchProducts()).rejects.toThrow('HTTP error! Status: 500');
  });
});
