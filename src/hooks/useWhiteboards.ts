'use client';

import { Whiteboard, WhiteboardDetails, WhiteboardElements } from '@/models/whiteboard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

const fetchWhiteboards = async () => {
    const response: AxiosResponse<Whiteboard[]> = await axios.get('/api/whiteboards');
    return response.data;
};

const fetchWhiteboardById = async (id: string) => {
    const response: AxiosResponse<Whiteboard> = await axios.get(`/api/whiteboards/${id}`);
    return response.data;
}

const addWhiteboard = async (whiteboard: WhiteboardDetails) => {
    await axios.post('/api/whiteboards', whiteboard);
};

const editWhiteboard = async (id: string, whiteboard: WhiteboardElements) => {
    await axios.put(`/api/whiteboards/${id}`, whiteboard);
};

export const useWhiteboards = () => {
    const queryClient = useQueryClient();

    const getWhiteboards = useQuery({ queryKey: ['whiteboards'], queryFn: fetchWhiteboards });
    const getWhiteboardById = (id: string) => useQuery({ queryKey: ['whiteboard', id], queryFn: () => fetchWhiteboardById(id), enabled: !!id });

    const addWhiteboardMutation = useMutation({
        mutationFn: addWhiteboard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['whiteboards'] });
        },
    });

    const editWhiteboardMutation = useMutation({
        mutationFn: ({ id, whiteboard }: { id: string; whiteboard: WhiteboardElements }) => editWhiteboard(id, whiteboard),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['whiteboards'] });
        },
    });

    return {
        getWhiteboards,
        getWhiteboardById,
        addWhiteboardMutation,
        addWhiteboardStatus: {
            isPending: addWhiteboardMutation.isPending,
            isSuccess: addWhiteboardMutation.isSuccess,
            error: addWhiteboardMutation.error,
        },
        editWhiteboardMutation,
        editWhiteboardStatus: {
            isPending: editWhiteboardMutation.isPending,
            isSuccess: editWhiteboardMutation.isSuccess,
            error: editWhiteboardMutation.error,
        },
    }
};
