export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

// Create 시에는 id가 필요 없음
export type CreatePost = Omit<Post, "id">;

// Update 시에는 일부만 수정 가능
export type UpdatePost = Partial<CreatePost>;
