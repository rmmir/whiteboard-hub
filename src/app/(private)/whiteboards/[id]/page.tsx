'use client';

import { useParams } from 'next/navigation';
import { useWhiteboards } from '@/hooks/useWhiteboards';
import ExcalidrawWrapper from '@/components/ExcalidrawWrapper';

export default function WhiteboardPage() {
    const { id } = useParams();
    const { data, isLoading, isError } = useWhiteboards().getWhiteboardById(id as string);
    
    if (isLoading) return <p>Loading...</p>;
    if (isError || !data) return <p>Something went wrong!</p>;

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">{data.name}</h1>
            <p className="text-gray-500 mb-4">{data.description}</p>
            <ExcalidrawWrapper whiteboardId={id as string} />
        </>
    );
}
