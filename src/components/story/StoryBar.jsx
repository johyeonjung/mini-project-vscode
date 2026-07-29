import { useEffect, useState } from "react";
import StoryItem from "./StoryItem";
import { createStory, getStories } from "../../apis/storyApi";

function StoryBar({ stories }) {
  const [storyList, setStoryList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const loadStories = async () => {
    try {
      const response = await getStories();

      const data = Array.isArray(response)
        ? response
        : response?.data || response?.contents || [];

      setStoryList(data);
    } catch (error) {
      console.error("스토리 조회 실패:", error);
    }
  };

  useEffect(() => {
    if (Array.isArray(stories) && stories.length > 0) {
      setStoryList(stories);
      return;
    }

    loadStories();
  }, []); // 처음 화면이 열릴 때 한 번만 실행

  const handleImageChange = async (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (selectedFiles.length === 0 || uploading) {
      return;
    }

    try {
      setUploading(true);

      await createStory(selectedFiles);
      await loadStories();

      alert("스토리가 등록되었습니다.");
    } catch (error) {
      console.error("스토리 등록 실패:", error);
      console.error("서버 응답:", error.response?.data);

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "스토리 등록에 실패했습니다."
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <section className="story-bar">
      <label
        htmlFor="story-image-input"
        className={`story-item story-create-item ${
          uploading ? "disabled" : ""
        }`}
      >
        <div className="story-border story-create-border">
          <span className="story-create-icon">
            {uploading ? "..." : "+"}
          </span>
        </div>

        <span>{uploading ? "등록 중" : "내 스토리"}</span>
      </label>

      <input
        id="story-image-input"
        type="file"
        accept="image/*"
        multiple
        disabled={uploading}
        onChange={handleImageChange}
        className="story-file-input"
      />

      {storyList.map((story) => (
        <StoryItem
          key={story.storyId}
          story={story}
        />
      ))}
    </section>
  );
}

export default StoryBar;