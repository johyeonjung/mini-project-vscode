import { useState } from "react";
import { createPost } from "../apis/postApi";

function CreatePostPage() {
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("PUBLIC");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFiles = (event) => {
    const selectedFiles = Array.from(event.target.files);

    setFiles(selectedFiles);
    setPreviews(
      selectedFiles.map((file) => URL.createObjectURL(file))
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!content.trim() && files.length === 0) {
      setMessage("내용이나 이미지를 입력해주세요.");
      return;
    }

    const formData = new FormData();

    formData.append("content", content);
    formData.append("visibility", visibility);

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      setLoading(true);
      setMessage("");

      await createPost(formData);

      setContent("");
      setFiles([]);
      setPreviews([]);
      setMessage("게시글 작성 완료");
    } catch (error) {
      console.error(error);
      setMessage("게시글 작성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-page">
      <form className="create-card" onSubmit={handleSubmit}>
        <h2>새 게시물 만들기</h2>

        <label className="upload-box">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFiles}
          />
          <span>사진 선택</span>
        </label>

        {previews.length > 0 && (
          <div className="preview-grid">
            {previews.map((preview, index) => (
              <img
                key={preview}
                src={preview}
                alt={`미리보기 ${index + 1}`}
              />
            ))}
          </div>
        )}

        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="문구를 입력하세요..."
          rows={6}
        />

        <select
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)}
        >
          <option value="PUBLIC">전체 공개</option>
          <option value="FOLLOWER">팔로워 공개</option>
          <option value="PRIVATE">비공개</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "게시 중..." : "공유하기"}
        </button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default CreatePostPage;