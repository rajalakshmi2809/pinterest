import api from './api.js';

export const fetchFeed = () => api.get('/posts');
export const fetchTrending = () => api.get('/posts/trending');
export const createPost = (payload, config) => api.post('/posts', payload, config);
export const likePost = (postId) => api.put(`/posts/${postId}/like`);
export const commentPost = (postId, payload) => api.post(`/posts/${postId}/comment`, payload);
export const searchPosts = (params) => api.get('/posts/search', { params });
