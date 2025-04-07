'use client';

import { Whiteboard, WhiteboardDetails } from '@/models/whiteboard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

const fetchWhiteboards = async () => {
    const response: AxiosResponse<Whiteboard[]> = await axios.get('/api/whiteboards');
    return response.data;
};

const addWhiteboard = async (whiteboard: WhiteboardDetails) => {
    await axios.post('/api/whiteboards', whiteboard);
};

export const useWhiteboards = () => {
    const queryClient = useQueryClient();

    const query = useQuery({ queryKey: ['whiteboards'], queryFn: fetchWhiteboards });

    const addWhiteboardMutation = useMutation({
        mutationFn: addWhiteboard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['whiteboards'] });
        },
    })

    return {
        ...query,

        // ADD
        addWhiteboardMutation,
        addWhiteboardStatus: {
            isPending: addWhiteboardMutation.isPending,
            isSuccess: addWhiteboardMutation.isSuccess,
            error: addWhiteboardMutation.error,
        }
    }
};
