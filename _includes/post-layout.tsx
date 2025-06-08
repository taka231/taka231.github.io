import BaseLayout from "./base-layout.tsx";

export default (data: Lume.Data, filters: Lume.Helpers) => {
  const { title, date, updated, tags, children, search } = data;
  
  // 全てのタグを収集して記事数をカウント
  const posts = search.pages("type=post", "date=desc");
  const tagCounts = new Map<string, number>();
  posts.forEach((post: any) => {
    if (post.tags) {
      post.tags.forEach((tag: string) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    }
  });
  
  // タグを記事数順にソート
  const sortedTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1]);

  return (
    <BaseLayout title={title} pageType="post">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article */}
          <main className="flex-1">
            <article className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 sm:p-12">
          {/* Article Header */}
          <header className="mb-8 pb-8 border-b border-gray-200">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {title}
            </h1>
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag: string, index: number) => (
                  <a
                    key={index}
                    href={`/tags/${tag}/`}
                    className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full font-medium hover:bg-gray-200 transition-colors duration-200"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            )}
            <div className="text-sm text-gray-500 font-light">
              {date && (
                <time dateTime={date}>
                  投稿: {new Date(date).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              )}
              {updated && (
                <time className="block mt-1" dateTime={updated}>
                  更新: {new Date(updated).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              )}
            </div>
          </header>
          
          {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {children}
              </div>
            </article>
            
            {/* Back to Home */}
            <div className="mt-12 text-center">
              <a 
                href="/" 
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <span className="text-lg">←</span>
                <span className="font-medium">記事一覧に戻る</span>
              </a>
            </div>
          </main>
          
          {/* Tags Sidebar */}
          <aside className="lg:w-80 w-full">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">タグ一覧</h2>
              <div className="space-y-2">
                {sortedTags.map(([tagName, count]) => (
                  <a
                    key={tagName}
                    href={`/tags/${tagName}/`}
                    className={`flex items-center justify-between p-2 rounded-md transition-colors duration-200 group ${
                      tags && tags.includes(tagName)
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className={`font-medium ${
                      tags && tags.includes(tagName)
                        ? 'text-blue-700' 
                        : 'text-gray-700 group-hover:text-blue-600'
                    }`}>
                      {tagName}
                    </span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {count}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </BaseLayout>
  );
};