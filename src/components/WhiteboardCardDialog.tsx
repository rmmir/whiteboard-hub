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

type WhiteboardCardDialogProps = {
    title: string;
    description: string;
}

const WhiteboardCardDialog: React.FC<WhiteboardCardDialogProps> = ({ title, description }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='cursor-pointer' variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Whiteboard</DialogTitle>
                    <DialogDescription>
                        Make changes to your whiteboard here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input id="title" defaultValue={title} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input id="description" defaultValue={description} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button className='cursor-pointer' type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WhiteboardCardDialog;
