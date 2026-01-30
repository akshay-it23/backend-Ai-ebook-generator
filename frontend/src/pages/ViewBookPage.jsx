import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import api from '../utils/api';
import { API_ENDPOINTS } from '../utils/constants';
import toast from 'react-hot-toast';

const ViewBookPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchBook();
  }, [bookId]);

  const fetchBook = async () => {
    try {
      setLoading(true);
      const response = await api.get(API_ENDPOINTS.BOOK_BY_ID(bookId));
      setBook(response.book);
    } catch (error) {
      toast.error('Failed to load book');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format) => {
    try {
      setExporting(true);
      const endpoint = format === 'pdf' ? API_ENDPOINTS.EXPORT_PDF : API_ENDPOINTS.EXPORT_DOCX;

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({ bookId }),
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${book.title}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success(`Book exported as ${format.toUpperCase()} successfully!`);
    } catch (error) {
      toast.error(`Failed to export as ${format.toUpperCase()}`);
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center py-20">
          <Loader size="lg" text="Loading book..." />
        </div>
      </DashboardLayout>
    );
  }

  if (!book) {
    return null;
  }

  const currentChapter = book.chapters[selectedChapterIndex];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-1">{book.title}</h1>
          {book.subtitle && <p className="text-text-secondary mb-1">{book.subtitle}</p>}
          <p className="text-sm text-text-muted">by {book.author}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            Back
          </Button>
          <Button variant="outline" onClick={() => navigate(`/editor/${bookId}`)}>
            Edit Book
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleExport('pdf')}
            loading={exporting}
            disabled={exporting}
          >
            Export PDF
          </Button>
          <Button
            variant="primary"
            onClick={() => handleExport('docx')}
            loading={exporting}
            disabled={exporting}
          >
            Export DOCX
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Chapter Navigation Sidebar */}
        <div className="col-span-12 lg:col-span-3">
          <div className="card sticky top-20">
            <h3 className="font-bold text-text-primary mb-4">Table of Contents</h3>
            <div className="space-y-2 max-h-[70vh] overflow-y-auto">
              {book.chapters.length === 0 ? (
                <p className="text-sm text-text-muted text-center py-4">
                  No chapters available
                </p>
              ) : (
                book.chapters.map((chapter, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedChapterIndex(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${selectedChapterIndex === index
                        ? 'bg-primary/20 border border-primary/30'
                        : 'hover:bg-white/5 border border-transparent'
                      }`}
                  >
                    <p className="text-sm font-medium text-text-primary">
                      {chapter.title || `Chapter ${index + 1}`}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Chapter Content */}
        <div className="col-span-12 lg:col-span-9">
          {currentChapter ? (
            <div className="card">
              <h2 className="text-3xl font-bold mb-6 text-text-primary">
                {currentChapter.title || `Chapter ${selectedChapterIndex + 1}`}
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-text-secondary whitespace-pre-wrap leading-relaxed">
                  {currentChapter.description || 'No content available for this chapter.'}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedChapterIndex(Math.max(0, selectedChapterIndex - 1))}
                  disabled={selectedChapterIndex === 0}
                >
                  ← Previous Chapter
                </Button>
                <span className="text-sm text-text-muted">
                  Chapter {selectedChapterIndex + 1} of {book.chapters.length}
                </span>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedChapterIndex(Math.min(book.chapters.length - 1, selectedChapterIndex + 1))}
                  disabled={selectedChapterIndex === book.chapters.length - 1}
                >
                  Next Chapter →
                </Button>
              </div>
            </div>
          ) : (
            <div className="card text-center py-20">
              <p className="text-text-secondary">No chapters available</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewBookPage;
