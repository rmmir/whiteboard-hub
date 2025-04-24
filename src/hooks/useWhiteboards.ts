'use client';

import { Whiteboard, WhiteboardDetails } from '@/models/whiteboard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { use } from 'react';

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

export const useWhiteboards = () => {
    const queryClient = useQueryClient();

    const getWhiteboards = useQuery({ queryKey: ['whiteboards'], queryFn: fetchWhiteboards });
    const getWhiteboardById = (id: string) => useQuery({ queryKey: ['whiteboard', id], queryFn: () => fetchWhiteboardById(id), enabled: !!id });

    const addWhiteboardMutation = useMutation({
        mutationFn: addWhiteboard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['whiteboards'] });
        },
    })

    return {
        getWhiteboards,
        getWhiteboardById,
        addWhiteboardMutation,
        addWhiteboardStatus: {
            isPending: addWhiteboardMutation.isPending,
            isSuccess: addWhiteboardMutation.isSuccess,
            error: addWhiteboardMutation.error,
        }
    }
};
