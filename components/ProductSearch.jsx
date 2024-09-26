import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const ProductSearch = ({ searchQuery, categoryFilter, currentPage, onAddProduct, setTotalItems }) => {
  const [products, setProducts] = useState([]); // Menyimpan produk yang didapat dari API
  const [hoveredProduct, setHoveredProduct] = useState(null); // Melacak produk yang di-hover
  const [priceRange, setPriceRange] = useState([5000, 1000000]); // Filter harga
  const [locationFilter, setLocationFilter] = useState(''); // Filter lokasi
  const [ratingFilter, setRatingFilter] = useState(''); // Filter rating
  const [loading, setLoading] = useState(false); // Status loading
  const [error, setError] = useState(null); // Menyimpan pesan error jika ada
  const itemsPerPage = 10; // Jumlah produk per halaman

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Lakukan permintaan ke API dengan pagination dan filter
        const queryCategory = categoryFilter ? `category=${categoryFilter}` : '';
        const querySearch = searchQuery ? `keyword=${searchQuery}` : '';

        // Combine queries if both category and searchQuery are available
        const combinedQuery = [queryCategory, querySearch].filter(Boolean).join('&');

        const response = await fetch(
          `https://nestjs-backend-production-f91c.up.railway.app/products/search?${combinedQuery}&page=${currentPage}&limit=${itemsPerPage}`
        );
        if (!response.ok) {
          throw new Error('Terjadi kesalahan saat mengambil data produk');
        }
        const data = await response.json();
        setProducts(data.products);
        setTotalItems(data.totalItems); // Set total item dan pass ke parent (ProductSearchModal)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Panggil API hanya jika ada categoryFilter atau searchQuery
    if (categoryFilter || searchQuery) {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [searchQuery, categoryFilter, currentPage, priceRange, locationFilter, ratingFilter]);

  return (


    <div className="flex items-center justify-center">
      {loading ? (
        <p>Memuat produk...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-40">
          <img src="/icons/middle pic.png" alt="No Products" className="h-24 w-24 mb-4" />
          <p className="text-gray-500 text-lg mb-2">Belum Ada Produk</p>
          <p className="text-gray-400 text-sm text-center">
            Silahkan cari produk di kolom pencarian dengan menuliskan nama produk yang ingin dicari
          </p>
        </div>
      ) : (
       <div className="p-4 max-h-[420px] overflow-y-scroll ">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-3 w-full">
          {products.map((product, index) => (
            <div
              key={product._id}
              className="bg-white p-4 shadow-md rounded-md"
            >
              <img src={product.productImage} alt={product.name} className="h-32 w-full object-cover mb-2" />
              <h3 className="text-sm text-ellipsis overflow-hidden mb-1 leading-tight">{product.name}</h3>
              <p className="text-black-500 font-bold text-lg">{product.price}</p>
              <div className="flex items-center space-x-1 mb-1">
                <span className="text-yellow-500 text-sm">⭐</span>
                <p className="text-xs text-gray-600">{product.ratings} / 5 </p>
              </div>
              {product.sentFrom && (
                <div className="flex items-center space-x-1 mb-2">
                  <p className="text-xs text-gray-600">{product.sentFrom}</p>
                </div>
              )}
              <button
                className="w-full py-2 rounded-full text-xs bg-cyan-500 text-white hover:bg-teal-500"
                onClick={() => onAddProduct(product)}
              >
                Tambahkan
              </button>
            </div>
          ))}
        </div>
        </div>
      )}
    </div>


  );
};

export default ProductSearch;
