import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
} from "lucide-react";

function PostActions({
  post,
  onLike,
  onBookmark,
  onComment,
}) {
  return (
    <div className="post-actions">
      <div className="post-actions-left">
        <button
          className={`icon-button ${post.liked ? "liked" : ""}`}
          onClick={() => onLike?.(post.postId)}
        >
          <Heart
            size={26}
            fill={post.liked ? "currentColor" : "none"}
          />
        </button>

        <button
          className="icon-button"
          onClick={() => onComment?.(post.postId)}
        >
          <MessageCircle size={26} />
        </button>

        <button className="icon-button">
          <Send size={25} />
        </button>
      </div>

      <button
        className="icon-button"
        onClick={() => onBookmark?.(post.postId)}
      >
        <Bookmark
          size={26}
          fill={post.bookmarked ? "currentColor" : "none"}
        />
      </button>
    </div>
  );
}

export default PostActions;