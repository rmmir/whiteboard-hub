import AddWhiteboardDialog from '@/components/AddWhiteboardDialog';
import Header from '@/components/Header';
import { Button } from '@/components/shadcn-ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/shadcn-ui/card";
import WhiteboardCardDialog from '@/components/WhiteboardCardDialog';

export default function Home() {
    return (
        <>
            <Header />
            <main className="flex flex-col gap-[32px] row-start-2 items-center">
                <div className="flex flex-row items-center justify-between w-full px-4 m-6">
                    <p className="text-gray-500">Create and manage your whiteboards.</p>
                    <AddWhiteboardDialog />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 m-6">
                    {[
                        { id: '1', title: "Whiteboard 1", description: "This is the first whiteboard.", updatedAt: "2023-10-01" },
                        { id: '2', title: "Whiteboard 2", description: "This is the second whiteboard.", updatedAt: "2023-10-02" },
                        { id: '3', title: "Whiteboard 3", description: "This is the third whiteboard.", updatedAt: "2023-10-03" },
                        { id: '4', title: "Whiteboard 4", description: "This is the fourth whiteboard.", updatedAt: "2023-10-04" },
                        { id: '5', title: "Whiteboard 5", description: "This is the fifth whiteboard.", updatedAt: "2023-10-05" },
                        { id: '6', title: "Whiteboard 6", description: "This is the sixth whiteboard.", updatedAt: "2023-10-06" },
                    ].map((board) => (
                        <Card key={board.id}>
                            <CardHeader className='flex flex-row justify-between'>
                                <div>
                                    <CardTitle>{board.title}</CardTitle>
                                    <CardDescription>{board.description}</CardDescription>
                                </div>
                                <WhiteboardCardDialog 
                                    title={board.title} 
                                    description={board.description}
                                />
                            </CardHeader>
                            <CardContent>
                                <p>{`Last update: ${board.updatedAt}`}</p>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 cursor-pointer">
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
