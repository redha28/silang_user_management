import { useForm } from "@inertiajs/react";
import Layout from "../../Layouts/Layout";

function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold mb-6 text-center">Masuk</h1>

                        {errors.email && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                {errors.email}
                            </div>
                        )}

                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            required
                            placeholder="Masukkan email Anda"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            required
                            placeholder="Masukkan password Anda"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            disabled={processing}
                        >
                            {processing ? 'Sedang Masuk...' : 'Masuk'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

Login.layout = page => <Layout children={page} title="Login" />;

export default Login;
