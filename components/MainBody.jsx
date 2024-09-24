'use client';

import React, { useState } from 'react';
import SideBar from './SideBar';
import { FaPrint } from 'react-icons/fa';
import ProductCard from './ProductCard';
import ProductSearchModal from './ProductSearchModal';
import PrintComparison from './PrintComparison';

const MainBody = () => {
  const [products, setProducts] = useState([null, null, null]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCariProduk = (index) => {
    setSelectedIndex(index);
    setShowModal(true);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleSelectProduct = (product) => {
    const newProducts = [...products];
    newProducts[selectedIndex] = product;
    setProducts(newProducts);
    setShowModal(false);
  };

  const handleHapusProduk = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    newProducts.push(null);
    setProducts(newProducts);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="overflow-x-auto pb-4">
        <div className="grid grid-cols-2 pb-4 gap-6 min-w-[900px]">
          {/* Kolom 1: Breadcrumb */}
          <div className="text-left">
            Beranda {'>'} Bandingkan Produk
          </div>

          {/* Kolom 2: Tombol Cetak */}
          <div className="flex justify-end">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePopup}
                className="flex items-center space-x-1 border border-teal-400 text-teal-600 bg-white px-4 py-2 rounded-full transition hover:bg-teal-500 hover:text-white no-print"
              >
                <FaPrint className="text-teal-600" />
                <span className="font-semibold">Cetak Perbandingan</span>
              </button>
            </div>
          </div>
        </div>

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

      {/* Popup PrintComparison */}
      {isPopupOpen && (
        <PrintComparison
          products={products}
          onClose={togglePopup}
        />
      )}
    </div>
  );
};

export default MainBody;