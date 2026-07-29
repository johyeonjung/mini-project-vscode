function RightSidebar() {
  return (
    <aside className="right-sidebar">
      <div className="my-profile-row">
        <div className="avatar placeholder-avatar" />
        <div>
          <strong>내 계정</strong>
          <p>BlogFeed 사용자</p>
        </div>
        <button>전환</button>
      </div>

      <div className="recommend-title">
        <span>회원님을 위한 추천</span>
        <button>모두 보기</button>
      </div>

      {[1, 2, 3, 4, 5].map((item) => (
        <div className="recommend-row" key={item}>
          <div className="avatar placeholder-avatar" />

          <div>
            <strong>추천사용자{item}</strong>
            <p>회원님을 위한 추천</p>
          </div>

          <button>팔로우</button>
        </div>
      ))}
    </aside>
  );
}

export default RightSidebar;