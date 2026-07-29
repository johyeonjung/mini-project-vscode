import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMe } from "../apis/authApi";
import { getUserPosts } from "../apis/postApi";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const userData = await getMe();
        const user = userData?.user || userData;

        setProfile(user);

        if (user?.instagramId) {
          const postData = await getUserPosts(user.instagramId);

          setPosts(
            Array.isArray(postData)
              ? postData
              : postData?.contents || postData?.content || []
          );
        }
      } catch (error) {
        console.error("프로필 조회 실패:", error);
        setErrorMessage("프로필을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return <div className="status-message">프로필 불러오는 중...</div>;
  }

  if (errorMessage) {
    return <div className="status-message error">{errorMessage}</div>;
  }

  if (!profile) {
    return <div className="status-message">프로필 정보가 없습니다.</div>;
  }

  return (
    <main className="profile-page">
      <section className="profile-header">
        <img
          className="profile-image"
          src={
            profile.profileImageUrl
              ? `http://localhost:8080${profile.profileImageUrl}`
              : `https://i.pravatar.cc/200?u=${profile.userId}`
          }
          alt="프로필"
        />

        <div className="profile-info">
          <div className="profile-title-row">
            <h2>{profile.instagramId || "사용자"}</h2>
            <button type="button">프로필 편집</button>
          </div>

          <div className="profile-counts">
            <span>
              게시물 <strong>{posts.length}</strong>
            </span>
            <span>
              팔로워 <strong>{profile.followerCount || 0}</strong>
            </span>
            <span>
              팔로우 <strong>{profile.followingCount || 0}</strong>
            </span>
          </div>

          <strong>{profile.nickname || profile.name || ""}</strong>
          <p>{profile.bio || "소개가 없습니다."}</p>
        </div>
      </section>

      <div className="profile-divider" />

      <section className="profile-grid">
        {posts.map((post) => {
          const firstImage = post.imageUrls?.[0];

          return (
            <Link
              key={post.postId}
              to={`/posts/${post.postId}`}
              className="profile-post"
            >
              {firstImage ? (
                <img
                  src={`http://localhost:8080${firstImage}`}
                  alt="게시글"
                />
              ) : (
                <div className="profile-text-post">
                  {post.content || "내용 없음"}
                </div>
              )}
            </Link>
          );
        })}
      </section>

      {posts.length === 0 && (
        <div className="status-message">
          아직 작성한 게시글이 없습니다.
        </div>
      )}
    </main>
  );
}

export default ProfilePage;