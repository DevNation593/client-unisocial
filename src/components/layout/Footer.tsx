import React from 'react';

export const Footer: React.FC = () => {
    return (
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <p>&copy; 2025 Your App. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="/privacy" className="hover:text-gray-300">Privacy</a>
              <a href="/terms" className="hover:text-gray-300">Terms</a>
              <a href="/contact" className="hover:text-gray-300">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    );
  };