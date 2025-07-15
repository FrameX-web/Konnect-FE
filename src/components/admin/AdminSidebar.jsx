import React from 'react';

const SIDEBAR_BG = 'bg-gradient-to-b from-[#E9C77F] to-[#FBE6B7]';

const AdminSidebar = ({
  tab,
  setTab,
  sidebarOpen = false,
  onClose = () => {},
}) => {
  const SidebarContent = (
    <>
      <div className="mb-0 md:mb-10 text-center w-full flex justify-center">
        <img
          src="/logo.png"
          alt="Konnect Logo"
          className="h-10 md:h-14 w-auto object-contain mx-auto"
          style={{ maxHeight: '56px' }}
        />
      </div>
      <nav className="flex flex-row md:flex-col gap-2 w-full justify-center md:justify-start mt-0 md:mt-4">
        <button
          className={`flex-1 md:w-full text-center md:text-left px-2 md:px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            tab === 'contact'
              ? 'bg-black text-[#E9C77F] shadow'
              : 'bg-white/70 text-black hover:bg-[#FBE6B7]'
          }`}
          onClick={() => {
            setTab('contact');
            onClose();
          }}
        >
          Contact Forms
        </button>
        <button
          className={`flex-1 md:w-full text-center md:text-left px-2 md:px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            tab === 'analytics'
              ? 'bg-black text-[#E9C77F] shadow'
              : 'bg-white/70 text-black hover:bg-[#FBE6B7]'
          }`}
          onClick={() => {
            setTab('analytics');
            onClose();
          }}
        >
          Analytics
        </button>
      </nav>
      <div className="flex-1 hidden md:block" />
      <div className="mt-0 md:mt-10 text-xs text-gray-500 text-center w-full hidden md:block">
        &copy; {new Date().getFullYear()} Konnect
      </div>
    </>
  );

  // Desktop sidebar
  if (!sidebarOpen) {
    return (
      <aside className={`hidden md:flex w-full md:w-64 ${SIDEBAR_BG} shadow-xl flex-col py-4 md:py-8 px-2 md:px-4 h-screen max-h-screen overflow-y-auto z-10 fixed left-0 top-0`}>
        {SidebarContent}
      </aside>
    );
  }

  // Mobile sidebar overlay
  return (
    <div className="fixed inset-0 z-40 flex">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Sidebar */}
      <aside className={`relative w-64 max-w-full ${SIDEBAR_BG} shadow-xl flex flex-col py-8 px-4 min-h-screen z-50 animate-slide-in-left`}>
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-black bg-[#FBE6B7] rounded-full p-2 shadow hover:bg-[#E9C77F] transition"
          onClick={onClose}
          aria-label="Close sidebar"
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 6L14 14M14 6L6 14" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        {SidebarContent}
        <div className="mt-10 text-xs text-gray-500 text-center w-full md:hidden">
          &copy; {new Date().getFullYear()} Konnect
        </div>
      </aside>
    </div>
  );
};

export default AdminSidebar;
