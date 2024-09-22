import React from 'react';
import { FaSearch } from 'react-icons/fa';

const ProductCardZero = ({ handleCariProduk, index }) => {  // Menerima handleCariProduk dan index sebagai props
  return (
    
              <div className="flex flex-col items-center border-gray-300 justify-center h-80">
                <div 
                  className="flex items-center justify-center border border-gray-300 rounded-full px-4 py-2 shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200"
                  onClick={() => handleCariProduk(index)}  // Panggil handleCariProduk dengan index
                >
                  <FaSearch className="text-cyan-500 mr-2" />
                  <span className="text-cyan-500 font-medium">Cari Produk</span>
                </div>

                
              </div>

            
  );
};

export default ProductCardZero;
