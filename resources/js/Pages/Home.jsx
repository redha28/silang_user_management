import { Link, usePage } from "@inertiajs/react";
import Layout from "../Layouts/Layout";

function Home({ name }) {
    const { auth } = usePage().props;
    const isAdmin = auth?.user?.role === 'admin';

    return (
        <div className="max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4">Selamat Datang di Sistem Manajemen Pengguna</h1>

                <p className="mb-6 text-gray-600">
                    Aplikasi ini menyediakan antarmuka sederhana untuk mengelola pengguna melalui API RESTful.
                </p>

                {auth?.user ? (
                    <div className="space-y-4">
                        <p className="text-green-600">Anda telah login sebagai {auth.user.name}
                            {auth.user.role === 'admin' && <span className="ml-1 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Admin</span>}
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                href="/users"
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                            >
                                Lihat Pengguna
                            </Link>

                            {isAdmin && (
                                <Link
                                    href="/users/create"
                                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                                >
                                    Tambah Pengguna Baru
                                </Link>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-yellow-600">Silakan login untuk mengakses fitur manajemen pengguna</p>
                        <Link
                            href="/login"
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

Home.layout = (page) => <Layout children={page} title="Home" />;

export default Home;
