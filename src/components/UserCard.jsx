import { useState, useRef } from "react";

function UserCard({ user, onLike, onFollow, onAddComment, onReplyComment, onViewProfile }) {
  const [commentInputs, setCommentInputs] = useState({});
  const [replyInputs, setReplyInputs] = useState({});
  const [activeReply, setActiveReply] = useState(null);
  const commentRefs = useRef({});
  const replyRefs = useRef({});

  const initial = user.name.charAt(0).toUpperCase();
  const latestPost = user.posts.length > 0 ? user.posts[user.posts.length - 1] : null;

  const handleCommentChange = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  };

  const handleSubmitComment = (postId) => {
    const text = (commentInputs[postId] || "").trim();
    if (!text) return;
    onAddComment(user.id, postId, text);
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    if (commentRefs.current[postId]) {
      commentRefs.current[postId].focus();
    }
  };

  const handleCommentKeyDown = (e, postId) => {
    if (e.key === "Enter") {
      handleSubmitComment(postId);
    }
  };

  const handleReplyChange = (commentId, value) => {
    setReplyInputs((prev) => ({ ...prev, [commentId]: value }));
  };

  const handleSubmitReply = (postId, commentId) => {
    const text = (replyInputs[commentId] || "").trim();
    if (!text) return;
    onReplyComment(user.id, postId, commentId, text);
    setReplyInputs((prev) => ({ ...prev, [commentId]: "" }));
    setActiveReply(null);
  };

  const handleReplyKeyDown = (e, postId, commentId) => {
    if (e.key === "Enter") {
      handleSubmitReply(postId, commentId);
    }
  };

  const toggleReply = (commentId) => {
    if (activeReply === commentId) {
      setActiveReply(null);
    } else {
      setActiveReply(commentId);
      setTimeout(() => {
        if (replyRefs.current[commentId]) {
          replyRefs.current[commentId].focus();
        }
      }, 50);
    }
  };

  return (
    <div className="user-card" id={`user-card-${user.id}`}>
      <div className="card-header">
        <div className="avatar" style={{ backgroundColor: user.liked ? "#EC4899" : "#2563EB" }}>
          {initial}
        </div>
        <div className="card-user-info">
          <h3 className="card-name">{user.name}</h3>
          <p className="card-username">@{user.username}</p>
        </div>
        <button
          className={`follow-btn ${user.followed ? "followed" : ""}`}
          id={`follow-btn-${user.id}`}
          onClick={() => onFollow(user.id)}
        >
          {user.followed ? "Following" : "Follow"}
        </button>
      </div>

      <div className="card-email">
        <span className="email-icon">📧</span>
        <span>{user.email}</span>
      </div>

      {latestPost && (
        <div className="latest-post-section">
          <div className="latest-post-label">🔥 Postingan Terbaru</div>
          <div className="post-item">
            <p className="post-text">{latestPost.text}</p>
            {latestPost.date && <span className="post-date">📅 {latestPost.date}</span>}

            <div className="comments-section">
              {latestPost.comments.length > 0 && (
                <div className="comments-list">
                  {latestPost.comments.map((comment) => (
                    <div className="comment-wrapper" key={comment.id}>
                      <div
                        className={`comment-item ${comment.isBot ? "bot-comment" : "user-comment"}`}
                      >
                        <div className="comment-top">
                          <span className="comment-name">
                            {comment.isBot ? "" : "👤"} {comment.name}
                          </span>
                          <button
                            className="reply-toggle-btn"
                            onClick={() => toggleReply(comment.id)}
                          >
                            Balas
                          </button>
                        </div>
                        <span className="comment-text">{comment.text}</span>
                      </div>

                      {comment.replies.length > 0 && (
                        <div className="replies-list">
                          {comment.replies.map((reply, rIdx) => (
                            <div
                              className={`reply-item ${reply.isBot ? "bot-comment" : "user-comment"}`}
                              key={rIdx}
                            >
                              <span className="comment-name">
                                {reply.isBot ? "" : "👤"} {reply.name}
                              </span>
                              <span className="comment-text">{reply.text}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeReply === comment.id && (
                        <div className="reply-input-wrapper">
                          <input
                            ref={(el) => (replyRefs.current[comment.id] = el)}
                            type="text"
                            className="reply-input"
                            placeholder={`Balas ${comment.name}...`}
                            value={replyInputs[comment.id] || ""}
                            onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                            onKeyDown={(e) => handleReplyKeyDown(e, latestPost.id, comment.id)}
                          />
                          <button
                            className="reply-send-btn"
                            onClick={() => handleSubmitReply(latestPost.id, comment.id)}
                          >
                            Kirim
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="comment-input-wrapper">
                <input
                  ref={(el) => (commentRefs.current[latestPost.id] = el)}
                  type="text"
                  className="comment-input"
                  id={`comment-input-${latestPost.id}`}
                  placeholder="Tulis komentar..."
                  value={commentInputs[latestPost.id] || ""}
                  onChange={(e) => handleCommentChange(latestPost.id, e.target.value)}
                  onKeyDown={(e) => handleCommentKeyDown(e, latestPost.id)}
                />
                <button
                  className="comment-send-btn"
                  id={`comment-send-${latestPost.id}`}
                  onClick={() => handleSubmitComment(latestPost.id)}
                >
                  Kirim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card-actions">
        <button
          className="view-profile-btn"
          id={`view-profile-${user.id}`}
          onClick={() => onViewProfile(user.id)}
        >
          👤 Lihat Profile
        </button>
      </div>

      <div className="card-footer">
        <button
          className={`like-btn ${user.liked ? "liked" : ""}`}
          id={`like-btn-${user.id}`}
          onClick={() => onLike(user.id)}
        >
          <span className="like-icon">{user.liked ? "❤️" : "🤍"}</span>
          <span className="like-count">{user.likeCount}</span>
        </button>
      </div>
    </div>
  );
}

export default UserCard;
