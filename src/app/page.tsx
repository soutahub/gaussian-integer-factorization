'use client';

import { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { motion, AnimatePresence } from 'framer-motion';
import { factorizeGaussianInteger } from '@/utils/gaussianIntegers';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsCalculating(true);
    
    try {
      const number = parseInt(input);
      if (isNaN(number)) {
        throw new Error('有効な整数を入力してください');
      }
      const factors = factorizeGaussianInteger(number);
      setResult(factors);
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-4">
          ガウス整数の素元分解
        </h1>
        <div className="text-center mb-8">
          <BlockMath math="\mathbb{Z}[i] = \left\{ a + bi \mid a,b \in \mathbb{Z} \right\}" />
        </div>
        
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="number" className="block text-gray-700 text-lg font-medium mb-3">
                整数を入力してください
              </label>
              <input
                type="number"
                id="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full px-6 py-4 text-xl border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="例: 42"
                step="1"
                pattern="\d*"
                onKeyDown={(e) => {
                  // 小数点の入力を防ぐ
                  if (e.key === '.') {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50"
              disabled={isCalculating}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isCalculating ? '計算中...' : '分解する'}
            </motion.button>
          </form>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg mb-6"
            >
              <p className="text-red-700">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">素元分解の結果</h2>
              <div className="text-xl text-gray-700 overflow-x-auto">
                <BlockMath math={result.join(' \\cdot ')} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="mt-12 text-center text-gray-700 bg-white/60 backdrop-blur-sm rounded-2xl p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-4">ガウス整数とは？</h3>
          <div className="space-y-4">
            <p className="text-lg">
              ガウス整数とは、実部と虚部が共に整数である複素数のことです。
            </p>
            <p className="text-lg">
              形式的には次のように表されます：
            </p>
            <BlockMath math="a + bi \quad (a, b \in \mathbb{Z})" />
            <p className="text-lg">
              ここで、<InlineMath math="i" />は虚数単位（<InlineMath math="i^2 = -1" />）を表します。
            </p>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
} 