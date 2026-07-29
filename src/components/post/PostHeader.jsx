import { MoreHorizontal } from "lucide-react";

function PostHeader({ post }) {
  return (
    <div className="post-header">
      <div className="post-user">
        <img
          className="avatar"
          src={
            post.profileImageUrl ||
            `https://i.pravatar.cc/150?u=${post.userId}`
          }
          alt={post.instagramId}
        />

        <div>
          <strong>{post.instagramId}</strong>
          <span className="post-date">
            · {formatDate(post.createdAt)}
          </span>
        </div>
      </div>

      <button className="icon-button">
        <MoreHorizontal size={24} />
      </button>
    </div>
  );
}

function formatDate(createdAt) {
  if (!createdAt) return "";

  const date = new Date(createdAt);
  const now = new Date();
  const difference = now - date;

  const minutes = Math.floor(difference / 60000);
  const hours = Math.floor(difference / 3600000);
  const days = Math.floor(difference / 86400000);

  if (minutes < 1) return "방금";
  if (minutes < 60) return `${minutes}분`;
  if (hours < 24) return `${hours}시간`;
  if (days < 7) return `${days}일`;

  return date.toLocaleDateString();
}

export default PostHeader;