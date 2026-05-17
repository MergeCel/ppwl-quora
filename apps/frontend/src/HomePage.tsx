import { useState, useEffect } from "react";
import TopNavbar from "./components/layout/TopNavbar";
import LeftSidebar from "./components/layout/LeftSidebar";
import CreatePostBox from "./components/post/CreatePostBox";
import PostCard from "./components/post/PostCard";
import "./style/home.css";

export default function HomePage() {
  // 1. Siapkan state untuk nyimpen data dari database AWS
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Tarik data (Fetch) pas halaman pertama kali dibuka
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Nembak ke URL backend yang ada di .env (localhost:3000)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`); 
        const data = await response.json();

        // Kalau sukses, masukin datanya ke state
        if (response.ok) {
          // Asumsi struktur data dari backend Cello ada di dalam property 'data' atau array langsung
          setPosts(data.data || data); 
        }
      } catch (error) {
        console.error("Gagal narik data postingan:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="home-page">
      <TopNavbar user={{ name: "User", email: "user@gmail.com" }} />

      <div className="home-layout">
        <LeftSidebar />

        <main className="feed-section">
          <CreatePostBox userName="User" />

          {/* 3. Tampilkan efek loading atau render datanya */}
          {isLoading ? (
            <div className="text-center mt-10 text-gray-500 font-semibold">Memuat postingan dari AWS...</div>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post.id}
                author={post.author?.name || "Anonim"}
                role={post.author?.role || "Pengguna Quora"}
                question={post.title || post.question} // Menyesuaikan nama kolom di database
                content={post.content}
                image={post.image}
                likes={post.likesCount || 0}
                comments={post.commentsCount || 0}
              />
            ))
          ) : (
            <div className="text-center mt-10 text-gray-500 font-semibold">
              Belum ada postingan. Jadilah yang pertama bertanya!
            </div>
          )}
        </main>
      </div>
    </div>
  );
}