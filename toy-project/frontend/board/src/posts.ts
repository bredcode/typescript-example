import axios from "axios";
import { Post, CreatePost, UpdatePost } from "./types";

const API_URL = "http://localhost:3001/posts";

export async function getPosts(): Promise<Post[]> {
  const res = await axios.get<Post[]>(API_URL);
  return res.data;
}

export async function createPost(data: CreatePost): Promise<Post> {
  const res = await axios.post<Post>(API_URL, data);
  return res.data;
}

export async function updatePost(id: number, data: UpdatePost): Promise<Post> {
  const res = await axios.put<Post>(`${API_URL}/${id}`, data);
  return res.data;
}

export async function deletePost(id: number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
