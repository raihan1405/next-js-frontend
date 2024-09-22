'use client';

import React, { useState } from 'react';
import SideBar from './SideBar';
import ProductCard from './ProductCard';
import ProductSearchModal from './ProductSearchModal';

const MainBody = () => {
  const [products, setProducts] = useState([null, null, null]);  // Awalnya 3 slot produk
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleCariProduk = (index) => {
    // Set index slot yang ingin diisi produk dan tampilkan modal
    setSelectedIndex(index);
    setShowModal(true);
  };

  const handleSelectProduct = (product) => {
    const newProducts = [...products];
    newProducts[selectedIndex] = product;
    setProducts(newProducts);
    setShowModal(false); // Tutup modal setelah produk dipilih
  };

  const handleHapusProduk = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);   // Hapus produk di index yang dipilih
    newProducts.push(null);         // Tambahkan null di akhir array untuk menjaga panjang tetap 3 slot
    setProducts(newProducts);       // Perbarui state products dengan array baru
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="overflow-x-auto pb-4">
        <div className="grid grid-cols-4 gap-6 min-w-[900px]">
          <SideBar />
          {products.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              index={index}
              handleCariProduk={handleCariProduk}
              handleHapusProduk={handleHapusProduk}
            />
          ))}
        </div>
      </div>

      {/* Modal Pencarian Produk */}
      {showModal && (
        <ProductSearchModal
          onClose={() => setShowModal(false)}
          onSelectProduct={handleSelectProduct}
        />
      )}
    </div>
  );
};

export default MainBody;
