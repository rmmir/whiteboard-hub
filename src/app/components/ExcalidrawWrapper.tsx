'use client';
import dynamic from 'next/dynamic';

import '@excalidraw/excalidraw/index.css';

const Excalidraw = dynamic(() => import('@excalidraw/excalidraw').then((mod) => mod.Excalidraw), {
    ssr: false,
});

const ExcalidrawWrapper: React.FC = () => {
    return (
        <div style={{ border: '4px solid red', height: '500px', width: '500px' }}>
            <Excalidraw />
        </div>
    );
};

export default ExcalidrawWrapper;
