type PostContentProps = {
  question: string;
  content: string;
};

export default function PostContent({
  question,
  content,
}: PostContentProps) {
  return (
    <div className="post-content">

      <h2 className="post-question">
        {question}
      </h2>

      <p className="post-text">
        {content}
      </p>

    </div>
  );
}