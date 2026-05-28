import api from './api.js';

export const fetchBoards = () => api.get('/boards');
export const createBoard = (payload) => api.post('/boards', payload);
export const savePostToBoard = (boardId, payload) => api.put(`/boards/${boardId}/save`, payload);
