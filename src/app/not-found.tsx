'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="z-70 w-full h-screen flex items-center justify-center bg-black">
      <div className="border rounded-md flex flex-col overflow-hidden relative w-80 md:w-96 h-48 backdrop-blur-sm">
        {/* Header */}
        <motion.div
          className="border-b w-full flex justify-between items-center px-4 py-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <span className="font-semibold tracking-wide">Error</span>
          <div className="flex gap-2">
            <button className="w-5 h-5 flex items-center justify-center border border-white text-xs leading-none hover:bg-white hover:text-black transition">
              口
            </button>
            <button className="w-5 h-5 flex items-center justify-center border border-white text-xs leading-none hover:bg-white hover:text-black transition">
              X
            </button>
          </div>
        </motion.div>

        {/* 內容 */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-2xl text-white font-bold mb-2">404 - Not Found</h2>
          <p className="text-gray-400 mb-4">Could not find requested resource</p>
          <Link
            href="/"
            className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-black transition"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
