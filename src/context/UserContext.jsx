import { createContext, useState, useEffect } from "react";

const POSTS_DATA = [
  {
    userId: 1,
    text: "UDAH GUE BILANG PERSIB JUARA ",
    date: "28 Mei 2026",
    comments: [
      { id: "c1-1", name: "", text: "hoki doang ", isBot: true, replies: [] },
      { id: "c1-2", name: "pak sumaredi ", text: "jangan lupa konvoinya", isBot: true, replies: [] },
    ],
  },
  {
    userId: 1,
    text: "yang menang merayakan yang kalah menjelaskan",
    date: "29 Mei 2026",
    comments: [
      { id: "c2-1", name: "FANS AREMASEJASTI88", text: "tunggu arema jadi panggung juara", isBot: true, replies: [] },
    ],
  },
  {
    userId: 2,
    text: "yah sebentar lagi PKL",
    date: "27 Mei 2026",
    comments: [
      { id: "c3-1", name: "Msehan", text: "Semangat terus ya! 💪", isBot: true, replies: [] },
      { id: "c3-2", name: "Bapak Alamsuir", text: "gpp cari pengalaman sambil cari duit", isBot: true, replies: [] },
    ],
  },
  {
    userId: 2,
    text: "Lagi dengerin lagu baru, enak bgt buat santai~",
    date: "30 Mei 2026",
    comments: [
      { id: "c4-1", name: "AIbuddy", text: "Lagu apaan bre?", isBot: true, replies: [] },
    ],
  },
  {
    userId: 3,
    text: "suka banget sama lagu justin bieber",
    date: "26 Mei 2026",
    comments: [
      { id: "c5-1", name: "CepatBales", text: "Lana del rey ah...", isBot: true, replies: [] },
    ],
  },
  {
    userId: 3,
    text: "Baru nonton film kemarin, ceritanya seru abis!",
    date: "29 Mei 2026",
    comments: [
      { id: "c6-1", name: "galihGaul", text: "Film apaan? Aku juga mau nonton!", isBot: true, replies: [] },
      { id: "c6-2", name: "SipalingNgertiFilm", text: "seberapa PEAK sih?", isBot: true, replies: [] },
    ],
  },
  {
    userId: 4,
    text: "Ngoding dari pagi sampe sore, otak udah ngebul 💻🔥",
    date: "25 Mei 2026",
    comments: [
      { id: "c7-1", name: "AutoReply99", text: "Relate banget sama aku!", isBot: true, replies: [] },
      { id: "c7-2", name: "BotPintar", text: "Istirahat dulu bro, jangan lupa makan 😂", isBot: true, replies: [] },
    ],
  },
  {
    userId: 4,
    text: "Siapa yang suka kopi susu? Aku tiap hari minum ☕",
    date: "28 Mei 2026",
    comments: [
      { id: "c8-1", name: "fariz01 ", text: "MENDING MATCHA LAH", isBot: true, replies: [] },
      { id: "c8-1", name: "cheaa ", text: "kopi susu 8 ribuan paling enak ", isBot: true, replies: [] },
    ],
  },
  {
    userId: 5,
    text: "Main game semalem sampe lupa waktu, hehe 🎮",
    date: "26 Mei 2026",
    comments: [
      { id: "c9-1", name: "Friendsalloy", text: "Haha bener banget sih 😂", isBot: true, replies: [] },
    ],
  },
  {
    userId: 5,
    text: "Pengen liburan ke pantai, kangen ombak 🏖️",
    date: "30 Mei 2026",
    comments: [
      { id: "c10-1", name: "AIbuddy", text: "Kapan-kapan ajak aku ya!", isBot: true, replies: [] },
      { id: "c10-2", name: "nugrahaAlamsyah", text: "Aduh jadi pengen juga 😍", isBot: true, replies: [] },
    ],
  },
  {
    userId: 6,
    text: "Masak sendiri hari ini, hasilnya lumayan lah ya 🍲",
    date: "27 Mei 2026",
    comments: [
      { id: "c11-1", name: "fredoAlexander", text: "Wahh asyik banget tuh!", isBot: true, replies: [] },
    ],
  },
  {
    userId: 6,
    text: "Baru belajar React, ternyata seru juga!",
    date: "31 Mei 2026",
    comments: [
      { id: "c12-1", name: "xiesta", text: "Semangat belajarnya! 🔥", isBot: true, replies: [] },
      { id: "c12-2", name: "bocahLetris", text: "Aku juga lagi belajar nih!", isBot: true, replies: [] },
    ],
  },
  {
    userId: 7,
    text: "Jogging pagi tadi, sekarang badan seger banget 🏃",
    date: "28 Mei 2026",
    comments: [
      { id: "c13-1", name: "sisil", text: "Mantap jiwa! 🤩", isBot: true, replies: [] },
    ],
  },
  {
    userId: 7,
    text: "Lagi nyari rekomendasi buku bagus, ada saran?",
    date: "30 Mei 2026",
    comments: [
      { id: "c14-1", name: "acumalaka88", text: "Coba baca Atomic Habits, bagus banget!", isBot: true, replies: [] },
    ],
  },
  {
    userId: 8,
    text: "Kucingku baru lahiran, lucu banget anaknya 🐱",
    date: "29 Mei 2026",
    comments: [
      { id: "c15-1", name: "bagusnus", text: "Aduh jadi pengen juga 😍", isBot: true, replies: [] },
      { id: "c15-2", name: "fahrialvivi", text: "Foto dong pengen liat! 📸", isBot: true, replies: [] },
    ],
  },
  {
    userId: 8,
    text: "Hari Senin lagi, semangat kerja semuanya! 💪",
    date: "1 Juni 2026",
    comments: [
      { id: "c16-1", name: "DewanggaDeJET", text: "Semangat terus ya! 💪", isBot: true, replies: [] },
    ],
  },
  {
    userId: 9,
    text: "Baru coba cafe baru di deket rumah, tempatnya aesthetic! ✨",
    date: "29 Mei 2026",
    comments: [
      { id: "c17-1", name: "ARBIYEAY", text: "Seru banget kayaknya!", isBot: true, replies: [] },
      { id: "c17-2", name: "Maxal_ngantuk", text: "Mau dong diajakin 😎", isBot: true, replies: [] },
    ],
  },
  {
    userId: 9,
    text: "Lagi binge-watch drakor, ga bisa berhenti 📺",
    date: "31 Mei 2026",
    comments: [
      { id: "c18-1", name: "anakBapakAsep", text: "Wkwk iya bener 😆", isBot: true, replies: [] },
    ],
  },
  {
    userId: 10,
    text: "Hujan deras banget, untung bawa payung 🌧️",
    date: "30 Mei 2026",
    comments: [
      { id: "c19-1", name: "siNERD", text: "Aku juga pernah ngalamin ini loh", isBot: true, replies: [] },
    ],
  },
  {
    userId: 10,
    text: "Foto sunset tadi sore bagus banget, sayang ga sempet motret 🌅",
    date: "1 Juni 2026",
    comments: [
      { id: "c20-1", name: "rahayu diningrat", text: "Kangen juga nih sama hal kayak gini", isBot: true, replies: [] },
      { id: "c20-2", name: "BotakAsep", text: "Next time harus siap kamera ya! 📷", isBot: true, replies: [] },
    ],
  },
];

export const UserContext = createContext();

let commentCounter = 0;

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        const usersWithState = data.map((user) => {
          const userPosts = POSTS_DATA
            .filter((p) => p.userId === user.id)
            .map((p, i) => ({
              id: `${user.id}-${i}`,
              text: p.text,
              date: p.date,
              comments: p.comments.map((c) => ({
                ...c,
                replies: [...c.replies],
              })),
            }));
          return {
            ...user,
            liked: false,
            likeCount: Math.floor(Math.random() * 50) + 5,
            followed: false,
            posts: userPosts,
          };
        });
        setUsers(usersWithState);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Gagal fetch data:", error);
        setLoading(false);
      });
  }, []);

  const handleLike = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              liked: !user.liked,
              likeCount: user.liked ? user.likeCount - 1 : user.likeCount + 1,
            }
          : user
      )
    );
  };

  const handleFollow = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, followed: !user.followed } : user
      )
    );
  };

  const handleAddComment = (userId, postId, commentText) => {
    commentCounter++;
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id !== userId) return user;
        const updatedPosts = user.posts.map((post) => {
          if (post.id !== postId) return post;
          const newComment = {
            id: `user-c-${commentCounter}`,
            name: "Kamu",
            text: commentText,
            isBot: false,
            replies: [],
          };
          return { ...post, comments: [...post.comments, newComment] };
        });
        return { ...user, posts: updatedPosts };
      })
    );
  };

  const handleReplyComment = (userId, postId, commentId, replyText) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id !== userId) return user;
        const updatedPosts = user.posts.map((post) => {
          if (post.id !== postId) return post;
          const updatedComments = post.comments.map((comment) => {
            if (comment.id !== commentId) return comment;
            const newReply = { name: "Kamu", text: replyText, isBot: false };
            return { ...comment, replies: [...comment.replies, newReply] };
          });
          return { ...post, comments: updatedComments };
        });
        return { ...user, posts: updatedPosts };
      })
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <UserContext.Provider
      value={{
        users: filteredUsers,
        searchTerm,
        setSearchTerm,
        handleLike,
        handleFollow,
        handleAddComment,
        handleReplyComment,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
