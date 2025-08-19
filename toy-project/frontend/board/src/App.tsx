// src/App.tsx
import { useEffect, useState } from "react";
import { getPosts, createPost, deletePost } from "./posts";
import type { Post, CreatePost } from "./types";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState<CreatePost>({
    title: "",
    content: "",
    author: "",
  });

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = async () => {
    if (!form.title || !form.content || !form.author) {
      alert("모든 값을 입력해주세요!");
      return;
    }
    const newPost = await createPost(form);
    setPosts([...posts, newPost]);
    setForm({ title: "", content: "", author: "" }); // 폼 초기화
  };

  const handleDelete = async (id: number) => {
    await deletePost(id);
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>게시판</h1>

      {/* 입력 폼 */}
      <div style={{ marginBottom: "10px" }}>
        <input type="text" name="title" placeholder="제목" value={form.title} onChange={handleChange} />
        <input type="text" name="content" placeholder="내용" value={form.content} onChange={handleChange} />
        <input type="text" name="author" placeholder="작성자" value={form.author} onChange={handleChange} />
        <button onClick={handleAdd}>글 추가</button>
      </div>

      {/* 글 목록 */}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <b>{post.title}</b> ({post.author})<p>{post.content}</p>
            <button onClick={() => handleDelete(post.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
