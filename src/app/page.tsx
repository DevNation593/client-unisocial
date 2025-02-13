// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Uni-Social</h1>
      <div className="space-x-4">
        <Link 
          href="/login" 
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Iniciar Sesión
        </Link>
        <Link 
          href="/register" 
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Registrarse
        </Link>
      </div>
    </main>
  );
}