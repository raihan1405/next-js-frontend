import React from 'react';
import { FaBell, FaShoppingCart, FaComments, FaSearch, FaBars } from 'react-icons/fa';

const MainHeader = () => {
    return (
        <header className="bg-white p-0 shadow-md">
            {/* Bagian Atas Header */}
            <div className="w-full bg-gray-200">
                <div className="container mx-auto hidden md:flex flex-col md:flex-row justify-between items-center py-2 px-4">
                    {/* Link Navigasi */}
                    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-5">
                        <a href="#" className="text-gray-700 hover:text-black">Mitra PaDi UMKM</a>
                        <a href="#" className="text-gray-700 hover:text-black">Menjadi Penjual</a>
                        <a href="#" className="text-gray-700 hover:text-black">Info</a>
                        <a href="#" className="text-gray-700 hover:text-black">Pusat Bantuan</a>
                    </div>

                    {/* Logo */}
                    <div className="flex items-center space-x-4 mt-2 md:mt-0">
                        <img src="/images/Logo-Buatan-Indonesia-Outline.png" alt="Logo 1" className="h-8" />
                        <img src="/images/Logo_BUMN_Untuk_Indonesia_2020.svg.png" alt="Logo 2" className="h-8" />
                    </div>
                </div>
            </div>


            {/* Bagian Bawah Header */}
            <div className="w-full bg-white">
                <div className="container mx-auto py-4 px-4">
                    <div className="flex flex-col md:flex-row items-center md:justify-between">
                        {/* Mobile View: Logo, Ikon, and User Info in one row */}
                        <div className="flex w-full justify-between items-center md:hidden">
                            {/* Logo */}
                            <div className="flex items-center space-x-2">
                                <img src="/images/padiUMKM.png" alt="Logo" className="h-8" />
                            </div>

                            {/* Ikon dan Informasi Pengguna */}
                            <div className="flex items-center space-x-4">
                                <FaBell className="text-gray-700 cursor-pointer" />
                                <FaShoppingCart className="text-gray-700 cursor-pointer" />
                                <FaComments className="text-gray-700 cursor-pointer" />

                                <div className="flex items-center space-x-2">
                                    <img src="/icons/user.png" alt="Profile" className="h-8 w-8 rounded-full" />
                                    <div className="text-gray-700">
                                        <span className="block font-medium">Muhammad</span>
                                        <span className="block text-sm">Buyer Retail</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search Box */}
                        <div className="flex-1 max-w-lg w-full mt-4 md:mt-0 relative md:order-2">
                            <input
                                type="text"
                                placeholder="Cari produk jasa atau vendor"
                                className="w-full border border-gray-300 rounded-full py-2 px-4 pl-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <FaSearch className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>

                        {/* Desktop View: Logo and Kategori */}
                        <div className="hidden md:flex items-center space-x-2 md:order-1">
                            <img src="/images/padiUMKM.png" alt="Logo" className="h-8" />
                            <button className="flex items-center space-x-1">
                                <img src="/icons/category.ba0a63f9 1.png" alt="Icon" className="h-6 w-6" />
                                <span className="font-bold text-gray-700">Kategori</span>
                            </button>
                        </div>

                        {/* Desktop View: Ikon dan Informasi Pengguna */}
                        <div className="hidden md:flex items-center space-x-4 md:order-3">
                            <FaBell className="text-gray-700 cursor-pointer" />
                            <FaShoppingCart className="text-gray-700 cursor-pointer" />
                            <FaComments className="text-gray-700 cursor-pointer" />

                            <div className="flex items-center space-x-2">
                                <img src="/icons/user.png" alt="Profile" className="h-8 w-8 rounded-full" />
                                <div className="text-gray-700">
                                    <span className="block font-medium">Muhammad</span>
                                    <span className="block text-sm">Buyer Retail</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </header>
    );
};

export default MainHeader;
