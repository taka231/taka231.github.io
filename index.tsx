import PostCard from "./_includes/post-card.tsx";

export const title = "taka2の備忘録";

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
  
  const options = {
    url: (n: number) => n === 1 ? "/" : `/page/${n}/`,
    size: 10
  };

  for (const page of paginate(posts, options)) {
    yield {
      ...page,
      content: (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Posts */}
            <main className="flex-1 space-y-8">
              {page.results.map((post: any, index: number) => (
                <PostCard key={index} post={post} />
              ))}
            </main>
            
            {/* Tags Sidebar */}
            <aside className="lg:w-80 w-full">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">タグ一覧</h2>
                <div className="space-y-2">
                  {sortedTags.map(([tag, count]) => (
                    <a
                      key={tag}
                      href={`/tags/${tag}/`}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors duration-200 group"
                    >
                      <span className="text-gray-700 group-hover:text-blue-600 font-medium">
                        {tag}
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
        </div>
      )
    };
  }
}
