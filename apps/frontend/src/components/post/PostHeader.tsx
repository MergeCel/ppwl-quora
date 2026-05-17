type PostHeaderProps = {
  author: string;
  role: string;
  time: string;
};

export default function PostHeader({
  author,
  role,
  time,
}: PostHeaderProps) {
  return (
    <div className="post-header">

      <div className="post-avatar">
        {author.charAt(0)}
      </div>

      <div className="post-user-info">

        <div className="post-author-row">

          <span className="post-author">
            {author}
          </span>

          <button className="follow-btn">
            Ikuti
          </button>

        </div>

        <span className="post-role">
          {role} · {time}
        </span>

      </div>

    </div>
  );
}