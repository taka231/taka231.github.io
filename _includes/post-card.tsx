interface PostCardProps {
  post: {
    title: string;
    url: string;
    date?: string;
    updated?: string;
    tags?: string[];
  };
  currentTag?: string;
}

export default ({ post, currentTag }: PostCardProps) => {
  return (
    <article 
      className="relative bg-white rounded-lg shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow duration-200"
    >
      {/* Full card link */}
      <a 
        href={post.url}
        className="absolute inset-0 rounded-lg"
        tabIndex={-1}
        aria-hidden="true"
      />
      
      {/* Article title as main link */}
      <h2 className="text-2xl font-medium text-gray-900 mb-3 leading-tight">
        <a 
          href={post.url}
          className="relative z-10 hover:text-blue-600 transition-colors duration-200"
        >
          {post.title}
        </a>
      </h2>
      
      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag: string, tagIndex: number) => (
            <a
              key={tagIndex}
              href={`/tags/${tag}/`}
              className={`relative z-10 inline-block text-xs px-2 py-1 rounded-full font-medium hover:bg-gray-200 transition-colors duration-200 ${
                currentTag && tag === currentTag
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {tag}
            </a>
          ))}
        </div>
      )}
      
      {/* Date */}
      <div className="text-sm text-gray-500 font-light">
        {post.date && (
          <time dateTime={post.date}>
            投稿: {new Date(post.date).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        )}
        {post.updated && (
          <time className="block mt-1" dateTime={post.updated}>
            更新: {new Date(post.updated).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        )}
      </div>
    </article>
  );
};