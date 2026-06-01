import { useEffect, useState } from "react";
import { useAuthStore } from "./stores/AuthStore";
import TopNavbar from "./components/layout/TopNavbar";
import LeftSidebar from "./components/layout/LeftSidebar";
import CreatePostBox from "./components/post/CreatePostBox";
import PostCard from "./components/post/PostCard";
import "./style/home.css";

const backupDummyPosts = [
  {
    id: "dummy-1",
    author: "Alpraditia Malik",
    role: "Author di Lawangsinau · Diperbarui 20 Apr",
    content:
      "Saya sebelum baca buku, tapi setelah baca buku jadi lebih terarah. Apa pendapat kalian soal membaca di tahun 2026 ini?",
    image_url:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=700&q=80",
    user: { id: null, name: "Alpraditia Malik" },
    _count: { likes: 0, comments: 0 },
  },
  {
    id: "dummy-2",
    author: "Arjun Maheswara",
    role: "Staff KWU HMSI UNTAN",
    content:
      "Guys, jangan lupa besok kumpul buat bahas progress tugas besar PPWL Qarou ya. Semangat tim A2!",
    image_url: null,
    user: { id: null, name: "Arjun Maheswara" },
    _count: { likes: 0, comments: 0 },
  },
];

export default function HomePage() {
  const { user } = useAuthStore();
  const [posts, setPosts] = useState<any[]>(backupDummyPosts);
  const [isLoading, setIsLoading] = useState(true);

  // PERBAIKAN 1: Tambahkan state ini khusus untuk memicu pop-up dari tombol merah
  const [triggerOpenModal, setTriggerOpenModal] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!import.meta.env.VITE_BACKEND_URL) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`);
        if (!res.ok) throw new Error("Gagal mengambil data");
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setPosts(json.data);
        }
      } catch (err) {
        console.error("Gagal nembak API, balik ke data dummy:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="home-page">
      {/* PERBAIKAN 2: Berikan fungsi untuk menambah angka trigger saat tombol merah diklik */}
      <TopNavbar
        user={{
          name: user?.name || "User Qarou",
          email: user?.email || "",
          avatarUrl: user?.avatarUrl || "",
        }}
        onOpenModal={() => setTriggerOpenModal((prev) => prev + 1)}
      />
      <div className="home-layout">
        <LeftSidebar />
        <main className="feed-section">
          {/* PERBAIKAN 3: Kirim sinyal trigger ke dalam CreatePostBox */}
          <CreatePostBox
            userName={user?.name || "User Qarou"}
            externalOpenTrigger={triggerOpenModal}
          />

          {isLoading ? (
            <p className="text-center p-4 text-gray-500">Memuat postingan...</p>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                postId={typeof post.id === "number" ? post.id : undefined}
                authorId={post.user?.id ?? undefined}
                author={post.user?.name || post.author || "Anonim"}
                role={post.role || "User Qarou"}
                time={post.created_at || "Baru saja"}
                question=""
                content={post.content}
                image={post.image_url}
                avatarUrl={post.user?.avatar_url}
                avatarColor="#7c3aed"
                likes={post._count?.likes ?? 0}
                comments={post._count?.comments ?? 0}
              />
            ))
          )}
        </main>
      </div>
    </div>
  );
}
