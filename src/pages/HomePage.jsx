import { useEffect, useState } from "react";
import { getFeeds } from "../apis/postApi";
import StoryBar from "../components/story/StoryBar";
import PostVard from "../components/post/PostVard";
import RightSidebar from "../components/layout/RightSidebar";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadFeeds();
  }, []);

  const loadFeeds = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getFeeds(1, 20);

      setPosts(data.contents || data.content || data || []);
    } catch (error) {
      console.error(error);
      setErrorMessage("피드를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <main className="home-feed">
        <StoryBar />

        {loading && (
          <div className="status-message">피드 불러오는 중...</div>
        )}

        {errorMessage && (
          <div className="status-message error">
            {errorMessage}
          </div>
        )}

        {!loading &&
          !errorMessage &&
          posts.map((post) => (
            <PostVard key={post.postId} post={post} />
          ))}

        {!loading && !errorMessage && posts.length === 0 && (
          <div className="status-message">
            아직 표시할 게시글이 없습니다.
          </div>
        )}
      </main>

      <RightSidebar />
    </div>
  );
}

export default HomePage;