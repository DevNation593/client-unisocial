import React from 'react';

export const Sidebar: React.FC = () => {
    const menuItems = [
      { label: 'Home', path: '/', icon: 'home' },
      { label: 'Profile', path: '/profile', icon: 'user' },
      { label: 'Timeline', path: '/timeline', icon: 'clock' },
      { label: 'Messages', path: '/messages', icon: 'message' }
    ];
  
    return (
      <aside className="w-64 bg-gray-800 min-h-screen">
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </aside>
    );
  };