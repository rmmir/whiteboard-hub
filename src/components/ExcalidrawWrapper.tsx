'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import type { ExcalidrawElement } from '@excalidraw/excalidraw/element/types';
import '@excalidraw/excalidraw/index.css';

const Excalidraw = dynamic(() => import('@excalidraw/excalidraw').then((mod) => mod.Excalidraw), {
    ssr: false,
});

const ExcalidrawWrapper: React.FC = () => {
    const [elements, setElements] = useState<ExcalidrawElement[]>([]);
    
    useEffect(() => {
        const savedData = localStorage.getItem("excalidrawScene");
        if (savedData) {
            setElements(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        if (elements.length > 0) {
            localStorage.setItem("excalidrawScene", JSON.stringify(elements));
        }
    }, [elements]);

    const handleElementsChange = (updatedElements: readonly ExcalidrawElement[]) => {
        const mutableElements = [...updatedElements] as ExcalidrawElement[];
        if (JSON.stringify(mutableElements) !== JSON.stringify(elements)) {
            setElements(mutableElements);
            localStorage.setItem("excalidrawScene", JSON.stringify(mutableElements));
        }
    };

    const handlePointerUp = () => {
        localStorage.setItem("excalidrawScene", JSON.stringify(elements));
    };

    return (
        <>
            <h1 className="text-2xl font-bold mt-5">Whiteboard title</h1>
            <div style={{ height: "85vh", width: '90vw', borderRadius: '20px', overflow: 'hidden' }}>
                <Excalidraw
                    initialData={{ elements }}
                    onChange={handleElementsChange}
                    onPointerUp={handlePointerUp}
                />        
            </div>
        </>
    );
};

export default ExcalidrawWrapper;
