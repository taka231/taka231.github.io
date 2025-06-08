import PostCard from "./_includes/post-card.tsx";

export const layout = "base-layout.tsx";

export default function* ({ search, paginate }: Lume.Data) {
  const posts = search.pages("type=post", "date=desc");
  
  // 全てのタグを収集して記事数をカウント
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
  
  const allTags = new Set<string>();
  posts.forEach((post: any) => {
    if (post.tags) {
      post.tags.forEach((tag: string) => allTags.add(tag));
    }
  });

  // 各タグごとにページを生成
  for (const tag of allTags) {
    const tagPosts = posts.filter((post: any) => 
      post.tags && post.tags.includes(tag)
    );

    const options = {
      url: (n: number) => n === 1 ? `/tags/${tag}/` : `/tags/${tag}/page/${n}/`,
      size: 10
    };

    for (const page of paginate(tagPosts, options)) {
      yield {
        ...page,
        url: page.pagination.page === 1 ? `/tags/${tag}/` : `/tags/${tag}/page/${page.pagination.page}/`,
        title: `「${tag}」の記事一覧`,
        tag: tag,
        content: (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Posts */}
              <main className="flex-1">
                {/* Tag Header */}
                <div className="mb-8">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    「{tag}」の記事一覧
                  </h1>
                  <p className="text-gray-600">
                    {tagPosts.length}件の記事があります
                  </p>
                </div>
                
                <div className="space-y-8">
              {page.results.map((post: any, index: number) => (
                <PostCard key={index} post={post} currentTag={tag} />
                ))}
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
                          tagName === tag 
                            ? 'bg-blue-50 border border-blue-200' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <span className={`font-medium ${
                          tagName === tag 
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
            
            {/* Pagination */}
            {page.pagination.totalPages > 1 && (
              <nav className="mt-16 flex justify-center items-center space-x-6">
                {page.pagination.previous ? (
                  <a 
                    href={page.pagination.previous}
                    className="group flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    <span className="text-lg">←</span>
                    <span className="font-medium">前のページ</span>
                  </a>
                ) : (
                  <span className="flex items-center space-x-2 text-gray-300 cursor-not-allowed">
                    <span className="text-lg">←</span>
                    <span className="font-medium">前のページ</span>
                  </span>
                )}
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                  <span className="font-medium">
                    {page.pagination.page} / {page.pagination.totalPages}
                  </span>
                  <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                </div>
                
                {page.pagination.next ? (
                  <a 
                    href={page.pagination.next}
                    className="group flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    <span className="font-medium">次のページ</span>
                    <span className="text-lg">→</span>
                  </a>
                ) : (
                  <span className="flex items-center space-x-2 text-gray-300 cursor-not-allowed">
                    <span className="font-medium">次のページ</span>
                    <span className="text-lg">→</span>
                  </span>
                )}
              </nav>
            )}

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
          </div>
        )
      };
    }
  }
}