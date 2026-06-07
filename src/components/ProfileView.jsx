import { useState, useRef } from "react";

function ProfileView({ user, onLike, onFollow, onAddComment, onReplyComment, onBack }) {
  const [commentInputs, setCommentInputs] = useState({});
  const [replyInputs, setReplyInputs] = useState({});
  const [activeReply, setActiveReply] = useState(null);
  const commentRefs = useRef({});
  const replyRefs = useRef({});

  const initial = user.name.charAt(0).toUpperCase();

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
    <div className="profile-view" id={`profile-${user.id}`}>
      <button className="back-btn" onClick={onBack}>
        ← Kembali
      </button>

      <div className="profile-card">
        <div className="profile-header">
          <div
            className="profile-avatar"
            style={{ backgroundColor: user.liked ? "#EC4899" : "#2563EB" }}
          >
            {initial}
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-username">@{user.username}</p>
            <p className="profile-email">
              <span>📧</span> {user.email}
            </p>
          </div>
          <div className="profile-actions">
            <button
              className={`follow-btn ${user.followed ? "followed" : ""}`}
              id={`profile-follow-btn-${user.id}`}
              onClick={() => onFollow(user.id)}
            >
              {user.followed ? "Following" : "Follow"}
            </button>
            <button
              className={`like-btn ${user.liked ? "liked" : ""}`}
              id={`profile-like-btn-${user.id}`}
              onClick={() => onLike(user.id)}
            >
              <span className="like-icon">{user.liked ? "❤️" : "🤍"}</span>
              <span className="like-count">{user.likeCount}</span>
            </button>
          </div>
        </div>

        <div className="profile-posts-section">
          <h3 className="profile-posts-title">📝 Semua Postingan ({user.posts.length})</h3>
          <div className="profile-posts-list">
            {user.posts.map((post) => (
              <div className="post-item" key={post.id}>
                <p className="post-text">{post.text}</p>
                {post.date && <span className="post-date">📅 {post.date}</span>}

                <div className="comments-section">
                  {post.comments.length > 0 && (
                    <div className="comments-list">
                      {post.comments.map((comment) => (
                        <div className="comment-wrapper" key={comment.id}>
                          <div
                            className={`comment-item ${comment.isBot ? "bot-comment" : "user-comment"}`}
                          >
                            <div className="comment-top">
                              <span className="comment-name">
                                {comment.isBot ? " " : "👤"} {comment.name}
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
                                onKeyDown={(e) => handleReplyKeyDown(e, post.id, comment.id)}
                              />
                              <button
                                className="reply-send-btn"
                                onClick={() => handleSubmitReply(post.id, comment.id)}
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
                      ref={(el) => (commentRefs.current[post.id] = el)}
                      type="text"
                      className="comment-input"
                      id={`profile-comment-input-${post.id}`}
                      placeholder="Tulis komentar..."
                      value={commentInputs[post.id] || ""}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      onKeyDown={(e) => handleCommentKeyDown(e, post.id)}
                    />
                    <button
                      className="comment-send-btn"
                      id={`profile-comment-send-${post.id}`}
                      onClick={() => handleSubmitComment(post.id)}
                    >
                      Kirim
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
