interface BaseLayoutProps {
  title: string;
  children: React.ReactNode;
  pageType?: 'home' | 'post';
}

export default ({ title, children, pageType = 'home' }: BaseLayoutProps) => {
  const pageTitle = pageType === 'post' ? `${title} | taka2の備忘録` : title;
  
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title>
        <meta name="description" content="taka2の個人ブログ - 思考と発見の記録" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Noto+Sans+JP:wght@300;400;500;600&display=swap" 
          rel="stylesheet" 
        />
        <link rel="stylesheet" href="/styles.css" />
        <style dangerouslySetInnerHTML={{
          __html: `
            body {
              font-family: 'Inter', 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              font-feature-settings: 'kern' 1, 'liga' 1;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
          `
        }} />
      </head>
      <body>
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-gray-50 text-gray-900 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <a href="/" className="inline-block hover:text-blue-600 transition-colors duration-200">
                <h1 className="text-4xl sm:text-5xl font-light tracking-tight">
                  taka2の備忘録
                </h1>
              </a>
            </div>
          </header>
          
          {/* Main Content */}
          {children}
        </div>
      </body>
    </html>
  );
};