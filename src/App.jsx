import { useContext, useState } from "react";
import { UserContext } from "./context/UserContext.jsx";
import Navbar from "./components/Navbar.jsx";
import UserCard from "./components/UserCard.jsx";
import ProfileView from "./components/ProfileView.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const { users, handleLike, handleFollow, handleAddComment, handleReplyComment, loading } =
    useContext(UserContext);

  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleViewProfile = (userId) => {
    setSelectedUserId(userId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedUserId(null);
  };

  const selectedUser = selectedUserId !== null
    ? users.find((u) => u.id === selectedUserId) || null
    : null;

  return (
    <div className="app">
      <Navbar />
      <main className="main-content" id="main-content">
        {selectedUser ? (
          <ProfileView
            user={selectedUser}
            onLike={handleLike}
            onFollow={handleFollow}
            onAddComment={handleAddComment}
            onReplyComment={handleReplyComment}
            onBack={handleBack}
          />
        ) : (
          <>
            <div className="content-header">
              <h2>Temukan Teman Baru 👋</h2>
              <p>Total: {users.length} user ditemukan</p>
            </div>

            {loading ? (
              <div className="loading" id="loading-spinner">
                <div className="spinner"></div>
                <p>Memuat data user...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="no-results" id="no-results">
                <span className="no-results-icon">😕</span>
                <p>User tidak ditemukan</p>
              </div>
            ) : (
              <div className="user-grid">
                {users.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onLike={handleLike}
                    onFollow={handleFollow}
                    onAddComment={handleAddComment}
                    onReplyComment={handleReplyComment}
                    onViewProfile={handleViewProfile}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
