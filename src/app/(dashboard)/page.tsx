import ExcalidrawWrapper from '@/components/ExcalidrawWrapper';
import Header from '@/components/Header';

export default function Home() {
    return (
        <>
            <Header />
            <main className="flex flex-col gap-[32px] row-start-2 items-center">
                <ExcalidrawWrapper />
            </main>
        </>
    );
}
