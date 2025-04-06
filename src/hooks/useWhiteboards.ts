'use client';

import { Whiteboard } from '@/models/whiteboard';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

const fetchWhiteboards = async () => {
  const response: AxiosResponse<Whiteboard[]> = await axios.get('/api/whiteboards');
  return response.data;
};

export const useWhiteboards = () => {
  return useQuery({ queryKey: ['whiteboards'], queryFn: fetchWhiteboards });
};