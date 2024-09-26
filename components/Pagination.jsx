import { useState } from "react";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  let [num, setNum] = useState(1); // Mengelola halaman awal yang akan ditampilkan

  // Fungsi untuk navigasi ke halaman berikutnya
  function next() {
    if (num < totalPages) {
      setNum(num + 1); // Memperbarui nomor halaman
      setCurrentPage(num + 1); // Update halaman di parent component
    }
  }

  // Fungsi untuk navigasi ke halaman sebelumnya
  function back() {
    if (num > 1) {
      setNum(num - 1); // Mengurangi nomor halaman
      setCurrentPage(num - 1); // Update halaman di parent component
    }
  }

  return (
    <div className="flex bg-white rounded-lg font-[Poppins] text-sm mt-4">
      {/* Tombol Previous */}
      <button
        onClick={back}
        className={`h-8 px-3 rounded-l-lg text-indigo-600 hover:bg-indigo-600 hover:text-white transition ${
          num === 1 ? 'cursor-not-allowed text-gray-300' : ''
        }`}
        disabled={num === 1} // Disable tombol jika pada halaman pertama
      >
        Prev
      </button>

      {/* Angka Halaman */}
      <div className="h-8 flex items-center justify-center px-3 text-indigo-600">
        <span>{num} of {totalPages}</span>
      </div>

      {/* Tombol Next */}
      <button
        onClick={next}
        className={`h-8 px-3 rounded-r-lg text-indigo-600 hover:bg-indigo-600 hover:text-white transition ${
          num >= totalPages ? 'cursor-not-allowed text-gray-300' : ''
        }`}
        disabled={num >= totalPages} // Disable jika sudah mencapai halaman terakhir
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
