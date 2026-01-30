import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/layout/DashboardLayout';
import BookCard from '../components/card/BookCard';
import CreateBookModal from '../components/modal/CreateBookModal';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import api from '../utils/api';
import { API_ENDPOINTS } from '../utils/constants';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await api.get(API_ENDPOINTS.BOOKS);
      setBooks(response.books || []);
    } catch (error) {
      toast.error('Failed to load books');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookCreated = (newBook) => {
    setBooks(prev => [newBook, ...prev]);
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await api.delete(API_ENDPOINTS.BOOK_BY_ID(bookId));
      setBooks(prev => prev.filter(book => book._id !== bookId));
      toast.success('Book deleted successfully');
    } catch (error) {
      toast.error('Failed to delete book');
      console.error(error);
    }
  };

  const filteredBooks = books.filter(book =>
    book && book.title && book.author &&
    (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8 animate-fadeInDown">
        <h1 className="text-4xl font-bold mb-2">
          Welcome back, <span className="gradient-text">{user?.name}</span>!
        </h1>
        <p className="text-text-secondary">
          Continue working on your e-books or start a new one
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fadeInUp">
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p className="text-text-muted text-sm">Total Books</p>
              <p className="text-3xl font-bold text-text-primary">{books.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl gradient-secondary flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-text-muted text-sm">Published</p>
              <p className="text-3xl font-bold text-text-primary">
                {books.filter(b => b && b.status === 'published').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <p className="text-text-muted text-sm">Drafts</p>
              <p className="text-3xl font-bold text-text-primary">
                {books.filter(b => b && b.status === 'draft').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8 animate-fadeInUp animation-delay-200">
        <div className="flex-1 w-full sm:max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-12"
            />
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsCreateModalOpen(true)}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          }
        >
          Create New Book
        </Button>
      </div>

      {/* Books Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader size="lg" text="Loading your books..." />
        </div>
      ) : filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeInUp animation-delay-300">
          {filteredBooks.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onDelete={handleDeleteBook}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 animate-fadeInUp animation-delay-300">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full glass flex items-center justify-center">
            <svg className="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-2">
            {searchQuery ? 'No books found' : 'No books yet'}
          </h3>
          <p className="text-text-secondary mb-6">
            {searchQuery
              ? 'Try adjusting your search query'
              : 'Create your first e-book to get started'}
          </p>
          {!searchQuery && (
            <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
              Create Your First Book
            </Button>
          )}
        </div>
      )}

      {/* Create Book Modal */}
      <CreateBookModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onBookCreated={handleBookCreated}
      />
    </DashboardLayout>
  );
};

export default DashboardPage;
