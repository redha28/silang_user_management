import { useForm, Link, usePage } from "@inertiajs/react";
import Layout from "../../Layouts/Layout";

function Edit({ user }) {
    const { auth } = usePage().props;
    const isOwnAccount = auth?.user?.id === user.id;

    const { data, setData, put, errors, processing } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        role: user.role || 'user',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/users/${user.id}`);
    };

    return (
        <div className="container mx-auto p-4 flex flex-col items-center">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-6 text-center">Edit Pengguna: {user.name}</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Nama
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />
                    {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                    />
                    {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password (kosongkan jika tidak diubah)
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                    />
                    {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                        Peran
                        {isOwnAccount && (
                            <span className="text-red-500 text-xs ml-2">(Tidak dapat mengubah peran diri sendiri)</span>
                        )}
                    </label>
                    <select
                        id="role"
                        className={`shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            isOwnAccount ? 'bg-gray-100 cursor-not-allowed' : ''
                        }`}
                        value={data.role}
                        onChange={e => !isOwnAccount && setData('role', e.target.value)}
                        disabled={isOwnAccount}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    {errors.role && <div className="text-red-500 text-sm">{errors.role}</div>}
                </div>

                <div className="flex items-center justify-between mt-6">
                    <Link
                        href="/users"
                        className="text-gray-600 hover:text-gray-800"
                    >
                        Batal
                    </Link>

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={processing}
                    >
                        {processing ? 'Menyimpan...' : 'Update Pengguna'}
                    </button>
                </div>
            </form>
        </div>
    );
}

Edit.layout = page => <Layout children={page} title="Edit Pengguna" />;

export default Edit;
