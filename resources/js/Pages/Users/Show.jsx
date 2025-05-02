import { Link, usePage } from "@inertiajs/react";
import Layout from "../../Layouts/Layout";

function Show({ user }) {
    const { auth } = usePage().props;
    const isAdmin = auth?.user?.role === 'admin';

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow overflow-hidden rounded-lg max-w-3xl mx-auto">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Detail Pengguna
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Informasi dan detail pengguna
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Nama Lengkap
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {user.name}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Alamat Email
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {user.email}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Peran
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    user.role === 'admin'
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-blue-100 text-blue-800'
                                }`}>
                                    {user.role}
                                </span>
                            </dd>
                        </div>
                    </dl>
                </div>

                {/* Button section moved to bottom */}
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <div className="flex justify-end space-x-4">
                        <Link
                            href="/users"
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-all duration-300 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Kembali
                        </Link>

                        {isAdmin && (
                            <Link
                                href={`/users/${user.id}/edit`}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                                Edit
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

Show.layout = page => <Layout children={page} title="Detail Pengguna" />;

export default Show;
