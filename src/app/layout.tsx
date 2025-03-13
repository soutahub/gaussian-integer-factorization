import './globals.css'
import 'katex/dist/katex.min.css'

export const metadata = {
  title: 'ガウス整数の素元分解',
  description: 'ガウス整数環Z[i]での素元分解を計算するWebアプリケーション',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
