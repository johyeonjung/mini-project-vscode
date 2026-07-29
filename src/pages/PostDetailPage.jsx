import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../apis/postApi";
import PostVard from "../components/post/PostVard";

function PostDetailPage() {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const data = await getPost(postId);
        setPost(data);
      } catch (error) {
        console.error("게시글 상세 조회 실패:", error);
        setErrorMessage("게시글을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [postId]);

  if (loading) {
    return <div className="status-message">게시글 불러오는 중...</div>;
  }

  if (errorMessage) {
    return <div className="status-message error">{errorMessage}</div>;
  }

  if (!post) {
    return <div className="status-message">게시글이 없습니다.</div>;
  }

  return (
    <div className="detail-page">
      <PostVard post={post} />
    </div>
  );
}

export default PostDetailPage;