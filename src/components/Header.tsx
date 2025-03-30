"use client";

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
    const router = useRouter();
    const mutation = useMutation({
        mutationFn: () => {
            return axios.post('/api/auth/logout');
        },
        onSuccess: () => {
            router.push('/login');
        },
    });
    
    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white position-fixed top-0 left-0 right-0 z-10">
            <h1 className="text-2xl font-bold">Whiteboard Hub</h1>
            <nav className="space-x-4">
                <a href="/" className="hover:text-gray-300">Home</a>
                <button 
                    onClick={() => mutation.mutate()} 
                    className="hover:text-gray-300 cursor-pointer bg-transparent border-none p-0"
                >
                    Logout
                </button>
            </nav>
        </header>
    );
}

export default Header;