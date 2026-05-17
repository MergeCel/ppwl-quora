type PostImageProps = {
  image: string;
};

export default function PostImage({
  image,
}: PostImageProps) {
  return (
    <div className="post-image-wrap">

      <img
        src={image}
        alt="post"
        className="post-image"
      />

    </div>
  );
}