'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import type { ExcalidrawElement } from '@excalidraw/excalidraw/element/types';
import '@excalidraw/excalidraw/index.css';
import { useWhiteboards } from '@/hooks/useWhiteboards';

type ExcalidrawWrapperProps = {
    whiteboardId: string;
};

const Excalidraw = dynamic(() => import('@excalidraw/excalidraw').then((mod) => mod.Excalidraw), {
    ssr: false,
});

const ExcalidrawWrapper: React.FC<ExcalidrawWrapperProps> = ({ whiteboardId }) => {
    const [elements, setElements] = useState<ExcalidrawElement[]>([]);
    const { getWhiteboardById, editWhiteboardMutation } = useWhiteboards();

    // Call getWhiteboardById directly at the top level
    const { data, isLoading, isError } = getWhiteboardById(whiteboardId);

    useEffect(() => {
        if (!isLoading && !isError && data) {
            const parsedElements = data.elements;
            setElements(parsedElements as any);
        }
    }, [data, isLoading, isError]);

    useEffect(() => {
        if (elements?.length > 0) {
            const jsonElements = { elements };
            editWhiteboardMutation.mutate({
                id: whiteboardId,
                whiteboard: { elements: elements.toString() },
            });
        }
    }, [elements]);

    const handleElementsChange = (updatedElements: readonly ExcalidrawElement[]) => {
        const mutableElements = [...updatedElements] as ExcalidrawElement[];
        if (JSON.stringify(mutableElements) !== JSON.stringify(elements)) {
            setElements(mutableElements);
        }
    };

    const handlePointerUp = () => {
        setElements(elements);
    };

    return (
        <div style={{ height: '85vh', width: '90vw', borderRadius: '20px', overflow: 'hidden' }}>
            <Excalidraw
                initialData={{ elements }}
                onChange={handleElementsChange}
                onPointerUp={handlePointerUp}
            />
        </div>
    );
};

export default ExcalidrawWrapper;
