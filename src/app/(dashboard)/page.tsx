import ExcalidrawWrapper from '@/components/ExcalidrawWrapper';
import Header from '@/components/Header';
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 m-6">
                    {[
                        { id: '1', title: "Whiteboard 1", description: "This is the first whiteboard." },
                        { id: '2', title: "Whiteboard 2", description: "This is the second whiteboard." },
                        { id: '3', title: "Whiteboard 3", description: "This is the third whiteboard." },
                    ].map((board) => (
                        <Card key={board.id}>
                            <CardHeader>
                                <CardTitle>{board.title}</CardTitle>
                                <CardDescription>{board.description}</CardDescription>
                                <WhiteboardCardDialog 
                                    title={board.title} 
                                    description={board.description}
                                />
                            </CardHeader>
                            <CardContent>
                                Content
                            </CardContent>
                            <CardFooter>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
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
