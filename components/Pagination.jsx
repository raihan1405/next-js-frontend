import { useState } from "react";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  let [num, setNum] = useState(1); // Mengelola halaman awal yang akan ditampilkan

  // Halaman yang akan ditampilkan, berdasarkan halaman saat ini
  const pages = [
    { page: num },
    { page: num + 1 },
    { page: num + 2 },
    { page: num + 3 },
  ];

  function next() {
    if (num + 3 < totalPages) {
      setNum(++num); // Memperbarui nomor halaman
    }
  }

  function back() {
    if (num > 1) {
      setNum(--num); // Mengurangi nomor halaman
    }
  }

  return (
    <div className="flex bg-white rounded-lg font-[Poppins] text-sm">
      {/* Tombol Previous */}
      <button
        onClick={back}
        className={`h-8 border-2 border-r-0 border-indigo-600
               px-3 rounded-l-lg hover:bg-indigo-600 hover:text-white ${
                 num === 1 ? 'cursor-not-allowed bg-gray-300' : ''
               }`}
        disabled={num === 1} // Disable tombol jika pada halaman pertama
      >
        <svg
          className="w-3 h-3 fill-current"
          viewBox="0 0 20 20"
        >
          <path
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </button>

      {/* Angka Halaman */}
      {pages.map((pg, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(pg.page)}
          className={`h-8 border-2 border-r-0 border-indigo-600 w-8 ${
            currentPage === pg.page && "bg-indigo-600 text-white"
          }`}
        >
          {pg.page}
        </button>
      ))}

      {/* Tombol Next */}
      <button
        onClick={next}
        className={`h-8 border-2 border-indigo-600
               px-3 rounded-r-lg hover:bg-indigo-600 hover:text-white ${
                 num + 3 >= totalPages ? 'cursor-not-allowed bg-gray-300' : ''
               }`}
        disabled={num + 3 >= totalPages} // Disable jika sudah mencapai halaman terakhir
      >
        <svg
          className="w-3 h-3 fill-current"
          viewBox="0 0 20 20"
        >
          <path
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
