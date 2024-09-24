import React from 'react'
import { FaTrashAlt, FaShoppingCart, FaStar, FaStarHalfAlt, FaInfoCircle } from 'react-icons/fa';

function SideBar() {
  return (
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
  );
}

export default SideBar
