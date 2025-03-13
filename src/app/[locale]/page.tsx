import { Link } from '@/navigation';
import Calculator from '@/components/Calculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-end mb-4 space-x-4">
          <Link href="/" locale="en" className="text-gray-600 hover:text-gray-900">English</Link>
          <Link href="/" locale="ja" className="text-gray-600 hover:text-gray-900">日本語</Link>
        </div>
        <Calculator />
      </div>
    </main>
  );
} 