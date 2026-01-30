import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';
import TextareaField from '../components/ui/TextareaField';
import Loader from '../components/ui/Loader';
import api from '../utils/api';
import { API_ENDPOINTS } from '../utils/constants';
import toast from 'react-hot-toast';

const EditorialPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  useEffect(() => {
    fetchBook();
  }, [bookId]);

  const fetchBook = async () => {
    try {
      setLoading(true);
      const response = await api.get(API_ENDPOINTS.BOOK_BY_ID(bookId));
      setBook(response.book);

      // Initialize with first chapter if exists
      if (response.book.chapters && response.book.chapters.length > 0) {
        setSelectedChapterIndex(0);
      }
    } catch (error) {
      toast.error('Failed to load book');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleAddChapter = () => {
    const newChapter = {
      title: `Chapter ${book.chapters.length + 1}`,
      description: '',
    };

    setBook(prev => ({
      ...prev,
      chapters: [...prev.chapters, newChapter]
    }));
    setSelectedChapterIndex(book.chapters.length);
  };

  const handleChapterChange = (field, value) => {
    setBook(prev => {
      const updatedChapters = [...prev.chapters];
      updatedChapters[selectedChapterIndex] = {
        ...updatedChapters[selectedChapterIndex],
        [field]: value
      };
      return { ...prev, chapters: updatedChapters };
    });
  };

  const handleDeleteChapter = (index) => {
    if (window.confirm('Are you sure you want to delete this chapter?')) {
      setBook(prev => ({
        ...prev,
        chapters: prev.chapters.filter((_, i) => i !== index)
      }));

      if (selectedChapterIndex >= index && selectedChapterIndex > 0) {
        setSelectedChapterIndex(selectedChapterIndex - 1);
      }
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await api.put(API_ENDPOINTS.BOOK_BY_ID(bookId), {
        title: book.title,
        subtitle: book.subtitle,
        author: book.author,
        chapters: book.chapters,
        status: book.status,
      });
      toast.success('Book saved successfully!');
    } catch (error) {
      toast.error('Failed to save book');
    } finally {
      setSaving(false);
    }
  };

  const handleGenerateAI = async () => {
    if (!aiPrompt.trim()) {
      toast.error('Please enter a prompt for AI generation');
      return;
    }

    try {
      setGenerating(true);
      const response = await api.post(API_ENDPOINTS.GENERATE_CHAPTER, {
        bookId: bookId,
        chapterTitle: book.chapters[selectedChapterIndex]?.title || 'New Chapter',
        prompt: aiPrompt,
      });

      if (response.content) {
        handleChapterChange('description', response.content);
        toast.success('AI content generated successfully!');
        setAiPrompt('');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to generate content');
    } finally {
      setGenerating(false);
    }
  };

  const handlePublish = async () => {
    try {
      await api.put(API_ENDPOINTS.BOOK_BY_ID(bookId), {
        ...book,
        status: 'published',
      });
      setBook(prev => ({ ...prev, status: 'published' }));
      toast.success('Book published successfully!');
    } catch (error) {
      toast.error('Failed to publish book');
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
          <p className="text-text-secondary">by {book.author}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
          <Button variant="outline" onClick={() => navigate(`/view-book/${bookId}`)}>
            Preview
          </Button>
          {book.status === 'draft' && (
            <Button variant="success" onClick={handlePublish}>
              Publish
            </Button>
          )}
          <Button variant="primary" onClick={handleSave} loading={saving}>
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Chapter Sidebar */}
        <div className="col-span-12 lg:col-span-3">
          <div className="card sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-text-primary">Chapters</h3>
              <button
                onClick={handleAddChapter}
                className="p-2 rounded-lg hover:bg-white/5 text-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {book.chapters.length === 0 ? (
                <p className="text-sm text-text-muted text-center py-4">
                  No chapters yet. Click + to add one.
                </p>
              ) : (
                book.chapters.map((chapter, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg cursor-pointer transition-all group ${selectedChapterIndex === index
                        ? 'bg-primary/20 border border-primary/30'
                        : 'hover:bg-white/5 border border-transparent'
                      }`}
                    onClick={() => setSelectedChapterIndex(index)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-text-primary line-clamp-2">
                        {chapter.title || `Chapter ${index + 1}`}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteChapter(index);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-error/20 text-error transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          {currentChapter ? (
            <>
              {/* Chapter Editor */}
              <div className="card">
                <h3 className="text-xl font-bold mb-4 text-text-primary">Edit Chapter</h3>
                <div className="space-y-4">
                  <InputField
                    label="Chapter Title"
                    value={currentChapter.title}
                    onChange={(e) => handleChapterChange('title', e.target.value)}
                    placeholder="Enter chapter title"
                  />

                  <TextareaField
                    label="Chapter Content"
                    value={currentChapter.description}
                    onChange={(e) => handleChapterChange('description', e.target.value)}
                    placeholder="Write your chapter content here..."
                    rows={15}
                    autoResize
                  />
                </div>
              </div>

              {/* AI Generation Panel */}
              <div className="card border-2 border-primary/30">
                <h3 className="text-xl font-bold mb-4 gradient-text flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AI Content Generation
                </h3>
                <div className="space-y-4">
                  <TextareaField
                    label="Describe what you want to generate"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="E.g., Write an introduction about a young wizard discovering their powers..."
                    rows={4}
                  />
                  <Button
                    variant="primary"
                    onClick={handleGenerateAI}
                    loading={generating}
                    disabled={generating || !aiPrompt.trim()}
                    className="w-full"
                  >
                    Generate with AI
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="card text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full glass flex items-center justify-center">
                <svg className="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-2">No chapters yet</h3>
              <p className="text-text-secondary mb-6">Add your first chapter to start writing</p>
              <Button variant="primary" onClick={handleAddChapter}>
                Add First Chapter
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditorialPage;
