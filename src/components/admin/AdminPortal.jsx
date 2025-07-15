import React, { useEffect, useState } from 'react';
import { Copy, Eye, X, Check, Download, Calendar, User, Phone, Mail, Globe, MessageCircle, FileImage } from 'lucide-react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

// Use the correct environment variable for backend API base URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000';

// Enhanced Card Component
const DataCard = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 ${className}`}>
    {children}
  </div>
);

// Copy Button Component
const CopyButton = ({ text, label }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors duration-200 text-sm"
      title={`Copy ${label}`}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

// Image Modal Component
const ImageModal = ({ src, alt, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
    <div className="relative max-w-4xl max-h-full">
      <button
        onClick={onClose}
        className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
      >
        <X size={24} />
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain rounded-lg"
      />
      <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded text-sm">
        {alt}
      </div>
    </div>
  </div>
);

// Enhanced Table Row Component
const TableRow = ({ children, className = "" }) => (
  <div className={`grid gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${className}`}>
    {children}
  </div>
);

// Stats Card Component
const StatsCard = ({ title, value, icon: Icon, color = "blue" }) => (
  <DataCard className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
        <Icon size={24} />
      </div>
    </div>
  </DataCard>
);

const AdminPortal = ({ onLogout, username = 'manas' }) => {
  const [tab, setTab] = useState('contact');
  const [contacts, setContacts] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${BACKEND_URL}/admin/contacts`)
        .then(res => res.ok ? res.json() : [])
        .then(data => Array.isArray(data) ? data : [])
        .catch(() => []),
      fetch(`${BACKEND_URL}/admin/analytics`)
        .then(res => res.ok ? res.json() : [])
        .then(data => Array.isArray(data) ? data : [])
        .catch(() => [])
    ]).then(([contactsData, analyticsData]) => {
      setContacts(contactsData);
      setAnalytics(analyticsData);
      setLoading(false);
    });
  }, []);

  // Prevent background scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  const ContactTable = () => (
    <DataCard>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MessageCircle className="text-blue-600" size={24} />
            Contact Form Submissions
          </h2>
          <div className="text-sm text-gray-500">
            Total: {contacts.length}
          </div>
        </div>
        
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact._id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <User className="text-gray-400 mt-1" size={16} />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Name</p>
                    <p className="text-gray-900 font-semibold">{contact.name}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="text-gray-400 mt-1" size={16} />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Phone</p>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900">{contact.phone}</span>
                      <CopyButton text={contact.phone} label="phone number" />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="text-gray-400 mt-1" size={16} />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email</p>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900">{contact.email}</span>
                      <CopyButton text={contact.email} label="email" />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Globe className="text-gray-400 mt-1" size={16} />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Country</p>
                    <p className="text-gray-900">{contact.country}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="text-gray-400 mt-1" size={16} />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Date</p>
                    <p className="text-gray-900">{new Date(contact.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-600 mb-2">Message</p>
                <p className="text-gray-900 leading-relaxed">{contact.message}</p>
              </div>
            </div>
          ))}
        </div>
        
        {contacts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No contact submissions found</p>
          </div>
        )}
      </div>
    </DataCard>
  );

  const AnalyticsTable = () => (
    <DataCard>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileImage className="text-green-600" size={24} />
            Analytics Submissions
          </h2>
          <div className="text-sm text-gray-500">
            Total: {analytics.length}
          </div>
        </div>
        
        <div className="space-y-4">
          {analytics.map((analytic) => (
            <div key={analytic._id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <User className="text-gray-400 mt-1" size={16} />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Name</p>
                    <p className="text-gray-900 font-semibold">{analytic.name}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="text-gray-400 mt-1" size={16} />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Phone</p>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900">{analytic.phone}</span>
                      <CopyButton text={analytic.phone} label="phone number" />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="text-gray-400 mt-1" size={16} />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email</p>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900">{analytic.email}</span>
                      <CopyButton text={analytic.email} label="email" />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Globe className="text-gray-400 mt-1" size={16} />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Country</p>
                    <p className="text-gray-900">{analytic.country}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="text-gray-400 mt-1" size={16} />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Date</p>
                    <p className="text-gray-900">{new Date(analytic.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FileImage className="text-gray-400 mt-1" size={16} />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Image</p>
                    {analytic.fileName ? (
                      <div className="flex items-center gap-2 mt-1">
                        <img
                          src={`${BACKEND_URL}/admin/analytics/image/${analytic._id}`}
                          alt={analytic.fileName}
                          className="w-16 h-16 object-cover rounded-lg border cursor-pointer hover:opacity-75 transition-opacity"
                          onClick={() => setSelectedImage({
                            src: `${BACKEND_URL}/admin/analytics/image/${analytic._id}`,
                            alt: analytic.fileName
                          })}
                        />
                        <button
                          onClick={() => setSelectedImage({
                            src: `${BACKEND_URL}/admin/analytics/image/${analytic._id}`,
                            alt: analytic.fileName
                          })}
                          className="flex items-center gap-1 px-2 py-1 bg-green-50 hover:bg-green-100 text-green-700 rounded-md transition-colors text-sm"
                        >
                          <Eye size={12} />
                          View
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">No image</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-600 mb-2">Message</p>
                <p className="text-gray-900 leading-relaxed">{analytic.message}</p>
              </div>
            </div>
          ))}
        </div>
        
        {analytics.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FileImage size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No analytics submissions found</p>
          </div>
        )}
      </div>
    </DataCard>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9C77F] to-[#FBE6B7] transition-all duration-300">
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar
          tab={tab}
          setTab={setTab}
          sidebarOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        {/* Main layout column */}
        <div className="flex-1 flex flex-col min-h-screen md:ml-64">
          {/* Header */}
          <div className="fixed top-0 left-0 right-0 z-20 md:ml-64">
            <AdminHeader
              username={username}
              onLogout={onLogout}
              onOpenSidebar={() => setSidebarOpen(true)}
            />
          </div>
          {/* Content */}
          <main className="flex-1 p-4 md:p-6 bg-gray-50 overflow-y-auto mt-[64px] md:mt-[72px]">
            <div className="max-w-7xl mx-auto">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatsCard
                  title="Total Contacts"
                  value={contacts.length}
                  icon={MessageCircle}
                  color="blue"
                />
                <StatsCard
                  title="Analytics Submissions"
                  value={analytics.length}
                  icon={FileImage}
                  color="green"
                />
                <StatsCard
                  title="Today's Submissions"
                  value={[...contacts, ...analytics].filter(item => 
                    new Date(item.createdAt).toDateString() === new Date().toDateString()
                  ).length}
                  icon={Calendar}
                  color="purple"
                />
              </div>
              {/* Main Content */}
              <div className="transition-all duration-300">
                {loading ? (
                  <DataCard className="p-12">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading data...</p>
                    </div>
                  </DataCard>
                ) : (
                  <>
                    {tab === 'contact' && <ContactTable />}
                    {tab === 'analytics' && <AnalyticsTable />}
                  </>
                )}
              </div>
            </div>
          </main>
          {/* Mobile Footer */}
          <footer className="md:hidden bg-white border-t border-gray-200 text-center py-3">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Konnect. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          src={selectedImage.src}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default AdminPortal;