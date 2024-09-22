import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const ProductSearch = ({ searchQuery, categoryFilter, currentPage, onAddProduct }) => {
  const [products, setProducts] = useState([]); // Menyimpan produk yang didapat dari API
  const [hoveredProduct, setHoveredProduct] = useState(null); // Melacak produk yang di-hover
  const [priceRange, setPriceRange] = useState([5000, 1000000]); // Filter harga
  const [locationFilter, setLocationFilter] = useState(''); // Filter lokasi
  const [ratingFilter, setRatingFilter] = useState(''); // Filter rating
  const [loading, setLoading] = useState(false); // Status loading
  const [error, setError] = useState(null); // Menyimpan pesan error jika ada
  const [totalItems, setTotalItems] = useState(0); // Total produk yang tersedia
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
        setTotalItems(data.totalItems); // Set total item yang cocok dengan pencarian
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
    <div className="flex">
      {/* Sidebar untuk menyaring produk */}
      <div className="w-1/4 p-3">
        <h2 className="font-bold mb-4">Sortir Produk</h2>
        {/* Radio Button Pilihan Harga */}
        <div className="mb-6">
          <label className="block text-gray-700">Harga</label>
          <div>
            <label>
              <input
                type="radio"
                name="harga"
                value="termurah"
                className="mr-2"
                onChange={() => setPriceRange([0, priceRange[1]])}
              />
              Termurah
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="harga"
                value="termahal"
                className="mr-2"
                onChange={() => setPriceRange([priceRange[0], 1000000])}
              />
              Termahal
            </label>
          </div>
        </div>

        {/* Filter Lokasi */}
        <div className="mb-4">
          <label className="block text-gray-700">Dikirim dari</label>
          <select
            value={locationFilter}
            onChange={e => setLocationFilter(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">Semua Lokasi</option>
            <option value="Kota Surabaya">Kota Surabaya</option>
            <option value="Jakarta Timur">Jakarta Timur</option>
            <option value="Bandung">Bandung</option>
          </select>
        </div>

        {/* Filter Rating */}
        <div className="mb-4">
          <label className="block text-gray-700">Rating</label>
          <select
            value={ratingFilter}
            onChange={e => setRatingFilter(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">Pilih Rating</option>
            <option value="4">4 ke atas</option>
            <option value="3">3 ke atas</option>
            <option value="2">2 ke atas</option>
            <option value="1">1 ke atas</option>
          </select>
        </div>
      </div>

      {/* Hasil Pencarian Produk */}
      <div className="w-3/4 p-4 max-h-[340px] overflow-y-scroll">
        {loading ? (
          <p>Memuat produk...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <img src="/icons/middle pic.png" alt="No Products" className="h-24 w-24 mb-4" />
            <p className="text-gray-500 text-lg mb-2">Belum Ada Produk</p>
            <p className="text-gray-400 text-sm text-center">
              Silahkan cari produk di kolom pencarian dengan menuliskan nama produk yang ingin dicari
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-3">
            {products.map((product, index) => (
              <div
                key={product._id}
                className="bg-white p-4 shadow-md rounded-md"
                onMouseEnter={() => setHoveredProduct(index)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <img src={product.productImage} alt={product.name} className="h-32 w-full object-cover mb-2" />

                {/* Judul */}
                <h3 className="text-sm text-ellipsis overflow-hidden mb-1 leading-tight">
                  {product.name}
                </h3>

                {/* Harga */}
                <p className="text-black-500 font-bold text-lg">{product.price}</p>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-1">
                  <span className="text-yellow-500 text-sm">⭐</span>
                  <p className="text-xs text-gray-600">{product.ratings} / 5 </p>
                </div>

                {/* Lokasi (jika tersedia) */}
                {product.sentFrom && (
                  <div className="flex items-center space-x-1 mb-2">
                    <FaMapMarkerAlt className="text-gray-500" />
                    <p className="text-xs text-gray-600">{product.sentFrom}</p>
                  </div>
                )}

                <button
                  className="w-full py-2 rounded-full text-xs bg-cyan-500 text-white hover:bg-teal-500"
                  onClick={() => onAddProduct(product)}
                >
                  {hoveredProduct === index ? 'Bandingkan Produk' : 'Tambahkan'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
