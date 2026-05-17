import TopNavbar from "./components/layout/TopNavbar";
import LeftSidebar from "./components/layout/LeftSidebar";
import CreatePostBox from "./components/post/CreatePostBox";
import PostCard from "./components/post/PostCard";
import "./style/home.css";

const dummyPosts = [
  {
    id: 1,
    author: "Alpraditia Malik",
    role: "Owner/Author di Lawangsinau (2025–saat ini) · Diperbarui 20 Apr",
    time: "",
    question: "Sejauh mana buku membawa mu berkembang?",
    content:
      "Saya sebelum baca buku: Goblog, ga pede, miskin, gampang emosian, ga sensitif, gendut, penyakitan, dan banyak lagi. Bisa diitung, jumlah buku yang saya baca sejak lahir sampai umur 34 tahun cuma 17. Iyak. Kalian ga salah baca. Cuma tujuh belas.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=700&q=80",
    avatarColor: "#7c3aed",
    likes: 62,
    comments: 14,
  },
];

export default function HomePage() {
  return (
    <div className="home-page">
      <TopNavbar user={{ name: "User", email: "user@gmail.com" }} />

      <div className="home-layout">
        <LeftSidebar />

        <main className="feed-section">
          <CreatePostBox userName="User" />
          {dummyPosts.map((post) => (
            <PostCard
              key={post.id}
              author={post.author}
              role={post.role}
              time={post.time}
              question={post.question}
              content={post.content}
              image={post.image}
              originSpace={post.originSpace}
              avatarColor={post.avatarColor}
              likes={post.likes}
              comments={post.comments}
            />
          ))}
        </main>
      </div>
    </div>
  );
}