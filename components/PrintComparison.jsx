import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FaTrashAlt, FaShoppingCart, FaStar, FaStarHalfAlt, FaInfoCircle } from 'react-icons/fa';

const PrintComparison = ({ onClose, products = [], renderStarAndRating }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Perbandingan Produk',
  });

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 print-modal">
      <div
        className="bg-white rounded-lg shadow-lg w-3/4 h-3/4 p-6 relative overflow-y-auto print-container"
        ref={componentRef}
      >
        {/* Tombol Tutup */}
        <button
          className="absolute top-4 right-4 text-xl transition duration-200 transform hover:scale-110 no-print"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold mb-6">Perbandingan Produk</h2>

        <div className="flex flex-wrap">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 p-2">
            {products.length > 0 && products[0] && (
              <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-xs flex flex-col justify-between border border-gray-300">
                <div className="p-4 text-left flex flex-col">
                  <div className="w-full h-60 flex items-start sm:h-48 lg:h-55">
                    <span className="text-lg font-semibold pt-4">Bandingkan Produk</span>
                  </div>

                  {/* Ensure the title section has a flexible but constrained height */}
                  <div className="flex flex-col justify-between" style={{ minHeight: '100px', maxHeight: '150px', overflowY: 'hidden' }}>
                    <h2 className="text-lg font-semibold" style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 3,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                    </h2>
                  </div>
                  <div className="flex items-center justify-between mt-4 invisible">
                    <button className="flex items-center justify-center bg-white text-teal-500 border border-teal-500 rounded-md p-2 hover:bg-teal-500 hover:text-white transition">
                      <FaTrashAlt className="mr-2" />
                    </button>
                    <button className="flex items-center justify-center bg-teal-500 text-white rounded-md p-2 hover:bg-teal-600 transition">
                      <FaShoppingCart className="mr-2" /> Keranjang
                    </button>
                  </div>

                  {/* Horizontal Line */}

                  <hr className="my-18 border-gray-300" />
                  {/* Grid for displaying product details */}
                  <div className="grid grid-cols-1 gap-2 mt-6 text-sm text-gray-600">
                    {/* Harga */}
                    <div></div>
                    <div className="flex items-center">
                      <span className="font-semibold">Harga</span>
                    </div>

                    {/* Dikirim dari */}
                    <div className="flex items-center">
                      <span className="font-semibold">Dikirim dari</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center relative group">
                      <span className="font-semibold">Rating</span>
                      <FaInfoCircle className="text-teal-500 ml-2 cursor-pointer" />
                      {/* Tooltip muncul saat di-hover */}
                      <div className="hidden group-hover:inline-block mt-2 ml-4 p-2 text-xs bg-teal-500 text-white rounded w-max">
                        Menampilkan peringkat berdasarkan ulasan pelanggan.
                      </div>
                    </div>

                    {/* Terjual */}
                    <div className="flex items-center relative group">
                      <span className="font-semibold">Terjual</span>
                      <FaInfoCircle className="text-teal-500 ml-2 cursor-pointer" />
                      {/* Tooltip muncul saat di-hover */}
                      <div className="hidden group-hover:inline-block mt-2 ml-4 p-2 text-xs bg-teal-500 text-white rounded w-max">
                        Menampilkan jumlah total unit yang terjual.
                      </div>
                    </div>

                    {/* Pajak */}
                    <div className="flex items-center relative group">
                      <span className="font-semibold">Pajak</span>
                      <FaInfoCircle className="text-teal-500 ml-2 cursor-pointer" />
                      {/* Tooltip muncul saat di-hover */}
                      <div className="hidden group-hover:inline-block mt-2 ml-4 p-2 text-xs bg-teal-500 text-white rounded w-max">
                        Menunjukkan apakah harga sudah termasuk pajak (jika berlaku).
                      </div>
                    </div>

                    {/* TKDN */}
                    <div className="flex items-center group">
                      <span className="font-semibold">TKDN</span>
                      <FaInfoCircle className="text-teal-500 ml-2 cursor-pointer" />
                      {/* Tooltip muncul saat di-hover */}
                      <div className="hidden group-hover:inline-block mt-2 ml-4 p-2 text-xs bg-teal-500 text-white rounded w-max">
                        Persentase konten lokal yang digunakan dalam produk.
                      </div>
                    </div>

                    <hr className="my-3 border-gray-300 w-full" />

                    {/* Stok */}
                    <div className="flex items-center">
                      <span className="font-semibold">Stok</span>
                    </div>

                    {/* Kategori */}
                    <div className="flex items-center">
                      <span className="font-semibold">Kategori</span>
                    </div>

                    {/* Brand */}
                    <div className="flex items-center">
                      <span className="font-semibold">Brand</span>
                    </div>

                    {/* Min Pembelian */}
                    <div className="flex items-center group">
                      <span className="font-semibold">Min Pembelian</span>
                      <FaInfoCircle className="text-teal-500 ml-2 cursor-pointer" />
                      {/* Tooltip muncul saat di-hover */}
                      <div className="hidden group-hover:inline-block mt-2 ml-4 p-2 text-xs bg-teal-500 text-white rounded w-max">
                        Jumlah minimum yang diperlukan untuk melakukan pemesanan.
                      </div>
                    </div>

                    {/* Berat Satuan */}
                    <div className="flex items-center">
                      <span className="font-semibold">Berat Satuan</span>
                    </div>

                    {/* Dimensi Ukuran */}
                    <div className="flex items-center group">
                      <span className="font-semibold">Dimensi Ukuran</span>
                      <FaInfoCircle className="text-teal-500 ml-2 cursor-pointer" />
                      {/* Tooltip muncul saat di-hover */}
                      <div className="hidden group-hover:inline-block mt-2 ml-4 p-2 text-xs bg-teal-500 text-white rounded w-max">
                        Memberikan dimensi produk untuk pertimbangan kesesuaian dan pengiriman.
                      </div>
                    </div>

                    <hr className="my-3 border-gray-300 w-full" />

                    {/* Penjual */}
                    <div className="flex items-center">
                      <span className="font-semibold">Penjual</span>
                    </div>

                    {/* BUMN Pengampu */}
                    <div className="flex items-center group">
                      <span className="font-semibold">BUMN Pengampu</span>
                      <FaInfoCircle className="text-teal-500 ml-2 cursor-pointer" />
                      {/* Tooltip muncul saat di-hover */}
                      <div className="hidden group-hover:inline-block mt-2 ml-4 p-2 text-xs bg-teal-500 text-white rounded w-max">
                        Nama Badan Usaha Milik Negara(BUMN) yang mengawasi atau mendukung produk.
                      </div>
                    </div>

                    {/* Rating dan ulasan */}
                    <div className="flex items-center group">
                      <span className="font-semibold">Rating & Ulasan</span>
                      <FaInfoCircle className="text-teal-500 ml-2 cursor-pointer" />
                      {/* Tooltip muncul saat di-hover */}
                      <div className="hidden group-hover:inline-block mt-2 ml-4 p-2 text-xs bg-teal-500 text-white rounded w-max">
                        Berisikan ulasan produk.
                      </div>
                    </div>

                    {/* Total Penjualan */}
                    <div className="flex items-center group">
                      <span className="font-semibold">Total Penjualan per Tahun</span>
                      <FaInfoCircle className="text-teal-500 ml-2 cursor-pointer" />
                      {/* Tooltip muncul saat di-hover */}
                      <div className="hidden group-hover:inline-block mt-2 ml-4 p-2 text-xs bg-teal-500 text-white rounded w-max">
                        Jumlah kumulatif penjualan dalam setahun yang dilakukan untuk produk tersebut.
                      </div>
                    </div>

                    <hr className="my-3 border-gray-300 w-full" />

                    {/* Deskripsi */}
                    <div className="flex items-center">
                      <span className="font-semibold">Deskripsi</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Kartu Produk yang Dibandingkan */}
          <div className="w-full lg:w-3/4 flex flex-wrap">
            {products.length > 0 ? (
              products.map((product, index) =>
                product ? (
                  <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-2">
                    {/* Kartu Produk */}
                    <div className="bg-white border rounded-lg shadow-md h-full flex flex-col">
                      {/* Bagian Gambar Produk */}
                      <div className="relative w-full h-50 p-4">
                        <div className="relative w-full h-50">
                          <img
                            src={product.productImage}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded-md"
                          />
                        </div>
                      </div>

                      {/* Informasi Produk */}
                      <div className="p-4 text-left flex flex-col flex-grow">
                        <h2
                          className="text-lg font-semibold mb-2"
                          style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {product.name}
                        </h2>

                        {/* Garis Horizontal */}
                        <hr className="my-3 border-gray-300" />

                        {/* Detail Produk */}
                        <div className="grid grid-cols-1 gap-2 mt-4 text-sm text-gray-600 flex-grow">
                          <div className="flex justify-between">

                            <span>{product.price}</span>
                          </div>
                          <div className="flex justify-between">

                            <span>{product.sentFrom}</span>
                          </div>
                          <div className="flex justify-between">

                            {product.ratingProduct}
                          </div>
                          <div className="flex justify-between">

                            <span>{product.soldQuantity}</span>
                          </div>
                          <div className="flex justify-between">

                            <span>{product.taxProduct}</span>
                          </div>
                          <div className="flex justify-between">

                            <span>{product.tkdn || '-'}</span>
                          </div>

                          {/* Garis Horizontal */}
                          <hr className="my-3 border-gray-300" />

                          <div className="flex justify-between">

                            <span>{product.stock}</span>
                          </div>
                          <div className="flex justify-between">

                            <span>{product.category}</span>
                          </div>
                          <div className="flex justify-between">

                            <span>{product.brand}</span>
                          </div>
                          <div className="flex justify-between">

                            <span>{product.minPurchase}</span>
                          </div>
                          <div className="flex justify-between">

                            <span>{product.unitWeight}</span>
                          </div>
                          <div className="flex justify-between">

                            <span>{product.sizeDimensions}</span>
                          </div>

                          {/* Garis Horizontal */}
                          <hr className="my-3 border-gray-300" />

                          <div className="flex justify-between">

                            <span>{product.seller}</span>
                          </div>
                          <div className="flex justify-between">

                            <img
                              src={product.bumnImage}
                              alt={product.name}
                              className="w-6 h-6 rounded-full"
                            />
                          </div>

                          <div className="flex justify-between">

                            <span>{product.ratingStore}</span>
                          </div>
                          <div className="flex justify-between">

                            <span>{product.totalSold}</span>
                          </div>

                          {/* Garis Horizontal */}
                          <hr className="my-3 border-gray-300" />

                          <div>
                            <p>{product.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Jika produk tidak ada, tampilkan pesan
                  <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-2">
                    <div className="bg-gray-200 border rounded-lg p-4 shadow-md h-full flex items-center justify-center">
                      <p className="text-gray-500">Slot Produk Kosong</p>
                    </div>
                  </div>
                )
              )
            ) : (
              <p className="text-gray-700">Tidak ada produk yang tersedia untuk dibandingkan.</p>
            )}
          </div>
        </div>

        {/* Tombol Unduh di dalam modal */}
        <div className="flex justify-center mt-6 no-print">
          <button
            onClick={handlePrint}
            className="bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600 transition duration-200"
          >
            Unduh File
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintComparison;


