'use client';

import { Whiteboard, WhiteboardDetails } from '@/models/whiteboard';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

const fetchWhiteboards = async () => {
    const response: AxiosResponse<Whiteboard[]> = await axios.get('/api/whiteboards');
    return response.data;
};

const addWhiteboard = async (whiteboard: WhiteboardDetails) => {
    await axios.post('/api/whiteboards', whiteboard);
};

export const useWhiteboards = () => {
    return useQuery({ queryKey: ['whiteboards'], queryFn: fetchWhiteboards });
};
