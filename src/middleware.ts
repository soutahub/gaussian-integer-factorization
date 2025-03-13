import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './config';

export default createMiddleware({
  // サポートする言語を定義
  locales,
  // デフォルトの言語
  defaultLocale,
  // 言語設定をローカルストレージに保存
  localePrefix: 'always'
});

export const config = {
  // 全てのルートに対してミドルウェアを適用
  matcher: ['/', '/(ja|en)/:path*']
}; 