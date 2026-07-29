import { useEffect, useState } from "react";
import axiosInstance from "../../apis/axiosInstance";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";

function PostVard({ post }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);

  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [commentCount, setCommentCount] = useState(
    post.commentCount || 0
  );
  const [isSubmittingComment, setIsSubmittingComment] =
    useState(false);

  const imageIds = post.imageIds || [];

  useEffect(() => {
    let objectUrls = [];
    let cancelled = false;

    const loadImages = async () => {
      try {
        const urls = await Promise.all(
          imageIds.map(async (imageId) => {
            const response = await axiosInstance.get(
              `/post-images/${imageId}`,
              {
                responseType: "blob",
              }
            );

            return URL.createObjectURL(response.data);
          })
        );

        if (cancelled) {
          urls.forEach((url) => URL.revokeObjectURL(url));
          return;
        }

        objectUrls = urls;
        setImageUrls(urls);
        setCurrentImageIndex(0);
      } catch (error) {
        console.error(
          "게시글 이미지 조회 실패:",
          error.response?.data || error
        );

        setImageUrls([]);
      }
    };

    if (imageIds.length > 0) {
      loadImages();
    } else {
      setImageUrls([]);
    }

    return () => {
      cancelled = true;

      objectUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [post.postId, post.imageIds]);

  const loadComments = async () => {
    try {
      const response = await axiosInstance.get(
        `/posts/${post.postId}/comments`
      );

      const commentList = Array.isArray(response.data)
        ? response.data
        : [];

      setComments(commentList);
      setCommentCount(commentList.length);
    } catch (error) {
      console.error(
        "댓글 조회 실패:",
        error.response?.data || error
      );
    }
  };

  useEffect(() => {
    loadComments();
  }, [post.postId]);

  const handleCreateComment = async () => {
    const content = commentContent.trim();

    if (!content || isSubmittingComment) {
      return;
    }

    try {
      setIsSubmittingComment(true);

      await axiosInstance.post(
        `/posts/${post.postId}/comments`,
        {
          content,
        }
      );

      setCommentContent("");

      await loadComments();
    } catch (error) {
      console.error(
        "댓글 등록 실패:",
        error.response?.data || error
      );

      alert("댓글 등록에 실패했습니다.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? imageUrls.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === imageUrls.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <article className="post-card">
      <PostHeader post={post} />

      {imageUrls.length > 0 && (
        <div className="post-image-wrapper">
          <img
            className="post-image"
            src={imageUrls[currentImageIndex]}
            alt="게시글"
          />

          {imageUrls.length > 1 && (
            <>
              <button
                type="button"
                className="image-nav image-nav-left"
                onClick={previousImage}
              >
                ‹
              </button>

              <button
                type="button"
                className="image-nav image-nav-right"
                onClick={nextImage}
              >
                ›
              </button>

              <div className="image-dots">
                {imageUrls.map((_, index) => (
                  <span
                    key={index}
                    className={
                      index === currentImageIndex
                        ? "active"
                        : ""
                    }
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <PostActions post={post} />

      <div className="post-info">
        <strong>
          좋아요 {post.likeCount || 0}개
        </strong>

        <p className="post-content">
          <strong>{post.instagramId}</strong>{" "}
          <span>{post.content}</span>
        </p>

        <button
          type="button"
          className="comment-count"
          onClick={loadComments}
        >
          댓글 {commentCount}개 모두 보기
        </button>

        <div className="comment-list">
          {comments.map((comment) => (
            <div
              className="comment-item"
              key={comment.commentId}
            >
              <strong>
                {comment.instagramId ||
                  comment.nickname ||
                  "사용자"}
              </strong>{" "}

              <span>{comment.content}</span>
            </div>
          ))}
        </div>

        <div className="comment-input">
          <input
            placeholder="댓글 달기..."
            value={commentContent}
            onChange={(e) =>
              setCommentContent(e.target.value)
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.nativeEvent.isComposing
              ) {
                handleCreateComment();
              }
            }}
          />

          <button
            type="button"
            onClick={handleCreateComment}
            disabled={
              !commentContent.trim() ||
              isSubmittingComment
            }
          >
            {isSubmittingComment
              ? "등록 중"
              : "게시"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default PostVard;