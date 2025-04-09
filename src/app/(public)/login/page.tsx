'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

type LoginFormInputs = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>();
    const router = useRouter();
    const mutation = useMutation({
        mutationFn: (data: LoginFormInputs) => {
            return axios.post('/api/auth/login', data);
        },
        onSuccess: () => {
            router.push('/');
        },
        onError: (error: AxiosError) => {
            const errorData = error.response?.data as { error: string };
            setErrorMsg(errorData.error);
        },
    });

    const onSubmit = (data: LoginFormInputs) => mutation.mutate(data);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-black">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-black">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: 'Email is required' })}
                            className={`mt-1 block w-full px-3 py-2 border text-black ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-black">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', { required: 'Password is required' })}
                            className={`mt-1 block w-full px-3 py-2 border text-black ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className={`w-full py-2 px-4 rounded cursor-pointer ${
                            mutation.isPending
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gray-800 text-white hover:bg-gray-600'
                        } focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
                    >
                        {mutation.isPending ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                {mutation.isError && (
                    <p className="mt-4 text-sm text-red-500 text-center">
                        {errorMsg ? `${errorMsg}` : 'An error occurred. Please try again.'}
                    </p>
                )}
                <div className="flex justify-center items-center mt-4">
                    <p className="text-gray-600">Don't have an account?</p>
                    <button
                        onClick={() => router.push('/register')}
                        className="text-gray-800 hover:text-gray-500 cursor-pointer bg-transparent border-none p-0 ml-1"
                    >
                        Click to register
                    </button>
                </div>
            </div>
        </div>
    );
}
