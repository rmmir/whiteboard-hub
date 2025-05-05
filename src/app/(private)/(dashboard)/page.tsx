'use client';

import AddWhiteboardDialog from '@/components/AddWhiteboardDialog';
import Header from '@/components/Header';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/shadcn-ui/card';
import WhiteboardCardDialog from '@/components/WhiteboardCardDialog';
import { useWhiteboards } from '@/hooks/useWhiteboards';
import { Whiteboard } from '@/models/whiteboard';
import { useRouter } from 'next/navigation';

export default function Home() {
    const { data, isLoading, isError } = useWhiteboards().getWhiteboards;
    const router = useRouter();
    
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Something went wrong!</p>;

    return (
        <>
            <main className="flex flex-col gap-[32px] row-start-2 items-center">
                <div className="flex flex-row items-center justify-between w-full px-4 m-6">
                    <p className="text-gray-500">Create and manage your whiteboards.</p>
                    <AddWhiteboardDialog />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 m-6">
                    {data?.map((whiteboard: Whiteboard) => (
                        <Card key={whiteboard.id}>
                            <CardHeader className="flex flex-row justify-between">
                                <div>
                                    <CardTitle>{whiteboard.name}</CardTitle>
                                    <CardDescription>{whiteboard.description}</CardDescription>
                                </div>
                                <WhiteboardCardDialog
                                    name={whiteboard.name}
                                    description={whiteboard.description}
                                />
                            </CardHeader>
                            <CardContent>
                                <p>{`Last update: ${whiteboard.updatedAt}`}</p>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <button 
                                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 cursor-pointer"
                                    onClick={() => router.push(`whiteboards/${whiteboard.id}`)}
                                >
                                    Open
                                </button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>
        </>
    );
}
