import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../apis/authApi";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    setErrorMessage("");

const data = await login(form);

console.log("로그인 응답:", data);

const token =
  typeof data === "string"
    ? data
    : data?.accessToken ||
      data?.token ||
      data?.jwtToken ||
      data?.data?.accessToken;

    if (!token) {
      throw new Error("응답에 토큰이 없습니다.");
    }

    localStorage.setItem("accessToken", token);
    navigate("/");
  } catch (error) {
    console.error(error);
    setErrorMessage("이메일 또는 비밀번호를 확인해주세요.");
  }
};

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleSubmit}>
        <h1>BlogFeed</h1>

        <input
          name="email"
          type="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">로그인</button>

        {errorMessage && (
          <p className="login-error">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}

export default LoginPage;