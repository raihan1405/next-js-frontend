import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import ProductSearch from './ProductSearch'; // Import komponen ProductSearch
import Pagination from './Pagination'; // Import komponen Pagination

const ProductSearchModal = ({ onClose, onSelectProduct }) => {
    const [searchQuery, setSearchQuery] = useState(""); // State untuk melacak query pencarian
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery); // Query yang sudah di-debounce
    const [suggestions, setSuggestions] = useState([]); // State untuk menyimpan suggestion dari API
    const [isSuggestionVisible, setIsSuggestionVisible] = useState(false); // State untuk mengontrol tampilan suggestions
    const [currentPage, setCurrentPage] = useState(1); // State untuk melacak halaman saat ini
    const totalPages = 10; // Ganti dengan jumlah halaman sebenarnya
    const inputRef = useRef(null); // Referensi untuk input search bar

    // Fungsi untuk mengambil suggestion dari API
    const fetchSuggestions = async (keyword) => {
        if (keyword.trim() !== "") {
            try {
                const response = await fetch(`https://nestjs-backend-production-f91c.up.railway.app/categories/categorySuggestion?keyword=${keyword}`);
                if (!response.ok) {
                    throw new Error("Gagal mengambil suggestion");
                }
                const data = await response.json();
                setSuggestions(data); // Simpan hasil suggestion di state
                setIsSuggestionVisible(true); // Tampilkan suggestions
            } catch (error) {
                console.error(error);
            }
        } else {
            setSuggestions([]); // Kosongkan suggestion jika tidak ada keyword
            setIsSuggestionVisible(false); // Sembunyikan suggestions jika tidak ada keyword
        }
    };

    // Debouncing untuk query search
    useEffect(() => {
        // Set timeout untuk menunda pemanggilan API
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery); // Perbarui query yang di-debounce setelah delay
        }, 500); // Tunggu 500ms sebelum memperbarui debounced query

        // Bersihkan timeout jika pengguna mengetik ulang sebelum 500ms
        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]); // Efek ini berjalan setiap kali searchQuery berubah

    // Fetch suggestion hanya jika debouncedQuery berubah
    useEffect(() => {
        if (debouncedQuery) {
            fetchSuggestions(debouncedQuery);
        }
    }, [debouncedQuery]); // Panggil API hanya ketika debouncedQuery berubah

    // Handle input search bar dan ambil suggestion
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value); // Perbarui state searchQuery
    };

    // Ketika pengguna memilih suggestion
    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion); // Set query dengan suggestion yang dipilih
        setSuggestions([]); // Kosongkan suggestion setelah dipilih
        setIsSuggestionVisible(false); // Sembunyikan suggestions setelah dipilih
    };

    // Handle klik di luar search bar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setIsSuggestionVisible(false); // Sembunyikan suggestions jika klik di luar
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Fungsi untuk menampilkan suggestions ketika input difokuskan
    const handleFocus = () => {
        if (suggestions.length > 0) {
            setIsSuggestionVisible(true); // Tampilkan suggestions saat input difokuskan
        }
    };

    // Fungsi untuk menangani pemilihan produk
    const handleSelectProduct = (product) => {
        onSelectProduct(product);  // Tambahkan produk yang dipilih melalui fungsi prop
        onClose();  // Tutup modal setelah menambahkan produk
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-4xl">
                {/* Header dengan Kotak Pencarian */}
                <div className="flex justify-between items-center mb-6 relative">
                    <div className="flex-1 max-w-lg relative" ref={inputRef}>
                        <input
                            type="text"
                            placeholder="Cari produk, jasa, atau vendor"
                            value={searchQuery}
                            onChange={handleSearch} // Perbarui query pencarian saat input berubah
                            onFocus={handleFocus} // Tampilkan suggestions saat input difokuskan
                            className="w-full border border-gray-300 rounded-full py-2 px-4 pl-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <FaSearch className="h-5 w-5 text-gray-400" />
                        </div>

                        {/* Tampilkan suggestions */}
                        {isSuggestionVisible && suggestions.length > 0 && (
                            <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={suggestion._id} // Menggunakan _id sebagai key
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSuggestionClick(suggestion.name)} // Memilih nama produk
                                    >
                                        {suggestion.name} {/* Menampilkan nama produk */}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Komponen ProductSearch dengan Pagination */}
                <ProductSearch
                    searchQuery={debouncedQuery}
                    currentPage={currentPage} // Pass halaman saat ini ke ProductSearch
                    onAddProduct={handleSelectProduct} // Pass handler untuk menambahkan produk yang dipilih
                />

                {/* Pagination dan Tombol Tutup */}
                <div className="flex justify-between items-center mt-6">
                    {/* Tombol Tutup */}
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-200"
                    >
                        Tutup
                    </button>

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages} // Pass total halaman ke Pagination
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductSearchModal;
