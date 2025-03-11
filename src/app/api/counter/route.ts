// シンプルなカウンター実装
// 実際のアプリケーションではデータベースを使用するべきですが、
// デモ用に簡易的なインメモリカウンターを使用します

let counter = 0; // 初期値をゼロに設定

export async function GET() {
  counter++; // カウンターをインクリメント
  
  // カウンターを8桁の文字列にフォーマット（先頭を0埋め）
  const formattedCounter = counter.toString().padStart(8, '0');
  
  return new Response(JSON.stringify({ count: formattedCounter }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
} 