import { Link, usePage } from "@inertiajs/react";
import Layout from "../../Layouts/Layout";
import { useState } from "react";
import ConfirmModal from "../../Components/ConfirmModal";

function Index({ users }) {
    const { auth } = usePage().props;
    const isAdmin = auth?.user?.role === 'admin';

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Modal state
    const [modalData, setModalData] = useState({
        show: false,
        type: null, // 'delete' or 'toggleRole'
        user: null,
        title: '',
        message: '',
        confirmText: '',
        confirmButtonClass: '',
        action: null
    });

    // Close modal
    const closeModal = () => {
        setModalData({...modalData, show: false});
    };

    // Show delete confirmation
    const confirmDelete = (user) => {
        // Prevent deleting self
        if (user.id === auth.user.id) {
            return;
        }

        // Admin can't delete other admins
        if (user.role === 'admin' && auth.user.role === 'admin') {
            return;
        }

        setModalData({
            show: true,
            type: 'delete',
            user: user,
            title: 'Konfirmasi Hapus',
            message: `Apakah Anda yakin ingin menghapus pengguna "${user.name}"? Tindakan ini tidak dapat dibatalkan.`,
            confirmText: 'Hapus',
            confirmButtonClass: 'bg-red-600 hover:bg-red-700',
            action: () => {
                document.getElementById(`delete-form-${user.id}`).submit();
            }
        });
    };

    // Show toggle role confirmation
    const confirmToggleRole = (user) => {
        // Prevent toggling self
        if (user.id === auth.user.id) {
            return;
        }

        const newRole = user.role === 'admin' ? 'user' : 'admin';
        const actionText = newRole === 'admin' ? 'menjadikan admin' : 'menjadikan pengguna biasa';

        setModalData({
            show: true,
            type: 'toggleRole',
            user: user,
            title: `Konfirmasi Ubah Peran`,
            message: `Apakah Anda yakin ingin ${actionText} untuk "${user.name}"?`,
            confirmText: user.role === 'admin' ? 'Jadikan User' : 'Jadikan Admin',
            confirmButtonClass: user.role === 'admin' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700',
            action: () => {
                document.getElementById(`toggle-role-form-${user.id}`).submit();
            }
        });
    };

    // Search functionality
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    {isAdmin && (
                        <Link
                            href="/users/create"
                            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Tambah Pengguna
                        </Link>
                    )}
                </div>

                <div className="mb-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                            placeholder="Cari pengguna berdasarkan nama, email, atau peran..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-4 py-3 rounded-tl-lg">Nama</th>
                                <th scope="col" className="px-4 py-3">Email</th>
                                <th scope="col" className="px-4 py-3">Peran</th>
                                <th scope="col" className="px-4 py-3 rounded-tr-lg">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                                        Tidak ada pengguna yang ditemukan
                                    </td>
                                </tr>
                            ) : (
                                currentUsers.map((user) => (
                                    <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-300 to-indigo-500 flex items-center justify-center text-white font-bold mr-3">
                                                    {user.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                {user.name}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">{user.email}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                user.role === 'admin'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center space-x-2">
                                                <Link
                                                    href={`/users/${user.id}`}
                                                    className="font-medium text-blue-600 hover:text-blue-900 transition-colors duration-200"
                                                    title="Lihat Detail"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                    </svg>
                                                </Link>

                                                {isAdmin && (
                                                    <>
                                                        <Link
                                                            href={`/users/${user.id}/edit`}
                                                            className="font-medium text-yellow-600 hover:text-yellow-900 transition-colors duration-200"
                                                            title="Edit Pengguna"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                            </svg>
                                                        </Link>

                                                        {auth.user.id !== user.id && (
                                                            <button
                                                                type="button"
                                                                onClick={() => confirmToggleRole(user)}
                                                                className={`font-medium ${
                                                                    user.role === 'admin'
                                                                        ? 'text-orange-600 hover:text-orange-900'
                                                                        : 'text-green-600 hover:text-green-900'
                                                                } transition-colors duration-200`}
                                                                title={user.role === 'admin' ? 'Jadikan User' : 'Jadikan Admin'}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                                                </svg>
                                                            </button>
                                                        )}

                                                        {/* Hidden form for toggle role */}
                                                        <form
                                                            id={`toggle-role-form-${user.id}`}
                                                            method="POST"
                                                            action={`/users/${user.id}/toggle-role`}
                                                            className="hidden"
                                                        >
                                                            <input type="hidden" name="_method" value="PATCH" />
                                                            <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')} />
                                                        </form>

                                                        {/* Delete button - disabled for admins if current user is admin */}
                                                        {!(user.role === 'admin' && auth.user.role === 'admin') && auth.user.id !== user.id && (
                                                            <button
                                                                type="button"
                                                                onClick={() => confirmDelete(user)}
                                                                className="font-medium text-red-600 hover:text-red-900 transition-colors duration-200"
                                                                title="Hapus Pengguna"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                </svg>
                                                            </button>
                                                        )}

                                                        {/* Hidden form for delete */}
                                                        <form
                                                            id={`delete-form-${user.id}`}
                                                            method="POST"
                                                            action={`/users/${user.id}`}
                                                            className="hidden"
                                                        >
                                                            <input type="hidden" name="_method" value="DELETE" />
                                                            <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')} />
                                                        </form>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-6">
                        <nav aria-label="Page navigation">
                            <ul className="inline-flex -space-x-px">
                                <li>
                                    <button
                                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className={`px-3 py-2 ml-0 leading-tight border rounded-l-lg ${
                                            currentPage === 1
                                                ? 'text-gray-400 bg-gray-100 border-gray-300 cursor-not-allowed'
                                                : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-100'
                                        }`}
                                    >
                                        Sebelumnya
                                    </button>
                                </li>

                                {[...Array(totalPages).keys()].map(number => (
                                    <li key={number + 1}>
                                        <button
                                            onClick={() => paginate(number + 1)}
                                            className={`px-3 py-2 leading-tight border ${
                                                currentPage === number + 1
                                                    ? 'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                                                    : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-100'
                                            }`}
                                        >
                                            {number + 1}
                                        </button>
                                    </li>
                                ))}

                                <li>
                                    <button
                                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        className={`px-3 py-2 leading-tight border rounded-r-lg ${
                                            currentPage === totalPages
                                                ? 'text-gray-400 bg-gray-100 border-gray-300 cursor-not-allowed'
                                                : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-100'
                                        }`}
                                    >
                                        Selanjutnya
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}

                <div className="mt-4 text-sm text-gray-500 text-center">
                    Menampilkan {filteredUsers.length > 0 ? indexOfFirstUser + 1 : 0} sampai {Math.min(indexOfLastUser, filteredUsers.length)} dari {filteredUsers.length} pengguna
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmModal
                show={modalData.show}
                onClose={closeModal}
                onConfirm={modalData.action}
                title={modalData.title}
                message={modalData.message}
                confirmText={modalData.confirmText}
                confirmButtonClass={modalData.confirmButtonClass}
            />
        </div>
    );
}

Index.layout = page => <Layout children={page} title="Manajemen Pengguna" />;

export default Index;
