import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/shadcn-ui/dialog';
import { Input } from '@/components/shadcn-ui/input';
import { Button } from '@/components/shadcn-ui/button';
import { Label } from '@/components/shadcn-ui/label';
import { useWhiteboards } from '@/hooks/useWhiteboards';
import { SubmitHandler, useForm } from 'react-hook-form';

type AddWhiteboardParams = {
    name: string;
    description: string;
}

const AddWhiteboardDialog: React.FC = () => {
    const { addWhiteboardMutation } = useWhiteboards();
    const handleAddWhiteboard = (data: AddWhiteboardParams) => {
        addWhiteboardMutation.mutate(
            data,
            {
                onError: (error) => {
                    console.error('Error adding whiteboard:', error);
                },
                onSuccess: () => {
                    console.log('Whiteboard added successfully!');
                },
            }
        );
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<AddWhiteboardParams>()

    const onSubmit: SubmitHandler<AddWhiteboardParams> = (data) => {
        handleAddWhiteboard(data);
        reset();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-gray-600 cursor-pointer" type="submit">
                    Add whiteboard
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Whiteboard</DialogTitle>
                    <DialogDescription>
                        Add your whiteboard here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" className="col-span-3" {...register("name")} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input id="description" className="col-span-3" {...register("description")} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogTrigger asChild>
                            <Button className="cursor-pointer" type="submit">
                                Save changes
                            </Button>
                        </DialogTrigger>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddWhiteboardDialog;
