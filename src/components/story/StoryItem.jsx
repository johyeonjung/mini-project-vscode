import { useEffect, useState } from "react";
import axios from "axios";

function StoryItem({ story }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    let objectUrl;

    const loadImage = async () => {
      const imagePath = story.imageUrls?.[0];

      if (!imagePath) {
        setImageUrl("https://placehold.co/100x100");
        return;
      }

      try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
          `http://localhost:8080${imagePath}`,
          {
            responseType: "blob",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        objectUrl = URL.createObjectURL(response.data);
        setImageUrl(objectUrl);
      } catch (error) {
        console.error("스토리 이미지 조회 실패:", error);
        console.error("요청 주소:", `http://localhost:8080${imagePath}`);

        setImageUrl("https://placehold.co/100x100");
      }
    };

    loadImage();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [story.imageUrls]);

  return (
    <button type="button" className="story-item">
      <div className="story-border">
        <img
          src={imageUrl}
          alt={story.instagramId || "스토리"}
        />
      </div>

      <span>{story.instagramId || "사용자"}</span>
    </button>
  );
}

export default StoryItem;