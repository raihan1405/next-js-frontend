import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa'; // Import icon untuk sidebar button
import ProductSearch from './ProductSearch';
import Pagination from './Pagination';

const ProductSearchModal = ({ onClose, onSelectProduct }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
    const [suggestions, setSuggestions] = useState([]);
    const [isSuggestionVisible, setIsSuggestionVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [isFilterOpen, setIsFilterOpen] = useState(false); // State untuk membuka/menutup filter di mobile
    const [priceRange, setPriceRange] = useState([0, 1000000]); // Tambahkan state untuk priceRange
    const [locationFilter, setLocationFilter] = useState(""); // Tambahkan state untuk locationFilter
    const [ratingFilter, setRatingFilter] = useState(""); // Tambahkan state untuk ratingFilter
    const itemsPerPage = 10;

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const inputRef = useRef(null);

    // Fungsi untuk mengambil suggestion
    const fetchSuggestions = async (keyword) => {
        if (keyword.trim() !== "") {
            try {
                const response = await fetch(`https://nestjs-backend-production-f91c.up.railway.app/categories/categorySuggestion?keyword=${keyword}`);
                if (!response.ok) {
                    throw new Error("Gagal mengambil suggestion");
                }
                const data = await response.json();
                setSuggestions(data);
                setIsSuggestionVisible(true);
            } catch (error) {
                console.error(error);
            }
        } else {
            setSuggestions([]);
            setIsSuggestionVisible(false);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    useEffect(() => {
        if (debouncedQuery) {
            fetchSuggestions(debouncedQuery);
        }
    }, [debouncedQuery]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setSuggestions([]);
        setIsSuggestionVisible(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setIsSuggestionVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleFocus = () => {
        if (suggestions.length > 0) {
            setIsSuggestionVisible(true);
        }
    };

    const handleSelectProduct = (product) => {
        onSelectProduct(product);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] sm:w-[85%] lg:w-[80%] max-w-6xl h-[600px] overflow-y-auto relative">
                {/* Header dengan Kotak Pencarian */}
                <div className="flex justify-between items-center mb-6 relative">
                    <div className="flex-1 max-w-lg relative" ref={inputRef}>
                        <input
                            type="text"
                            placeholder="Cari produk, jasa, atau vendor"
                            value={searchQuery}
                            onChange={handleSearch}
                            onFocus={handleFocus}
                            className="w-full border border-gray-300 rounded-full py-2 px-4 pl-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <FaSearch className="h-5 w-5 text-gray-400" />
                        </div>

                        {/* Tampilkan suggestions */}
                        {isSuggestionVisible && suggestions.length > 0 && (
                            <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                {suggestions.map((suggestion) => (
                                    <li
                                        key={suggestion._id}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSuggestionClick(suggestion.name)}
                                    >
                                        {suggestion.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Tombol Filter di mobile */}
                    <button
                        className="block lg:hidden bg-blue-500 text-white p-2 rounded-full"
                        onClick={() => setIsFilterOpen(true)} // Tampilkan filter ketika tombol ditekan
                    >
                        <FaBars />
                    </button>
                </div>

                {/* Filter Sidebar di mobile (di dalam modal) */}
                <div
                    className={`fixed top-0 right-0 w-3/4 sm:w-1/4 bg-white h-full z-50 transform transition-transform duration-300 ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}
                >
                    <button
                        onClick={() => setIsFilterOpen(false)}
                        className="text-gray-700 font-bold px-4 py-2"
                    >
                        <FaTimes className="mr-2" /> Tutup Filter
                    </button>
                    <div className="p-4">
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
                                        onChange={() => setPriceRange([0, 500000])}
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
                                        onChange={() => setPriceRange([500000, 1000000])}
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
                </div>

                {/* ProductSearch dengan Pagination */}
                <div className="lg:flex lg:flex-row">
                    {/* Sidebar Filter untuk Desktop */}
                    <div className="hidden lg:block w-1/4 p-3">
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
                                        onChange={() => setPriceRange([0, 500000])}
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
                                        onChange={() => setPriceRange([500000, 1000000])}
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

                    {/* Bagian untuk Produk */}
                    <div className="w-full lg:w-3/4 h-[420px] ">
                        <ProductSearch
                            searchQuery={debouncedQuery}
                            currentPage={currentPage}
                            onAddProduct={handleSelectProduct}
                            setCurrentPage={setCurrentPage}
                            setTotalItems={setTotalItems}
                        />
                    </div>


                </div>

                {/* Pagination dan Tombol Tutup */}
                <div className="flex justify-between items-center mt-2">
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-200"
                    >
                        Tutup
                    </button>

                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductSearchModal;
