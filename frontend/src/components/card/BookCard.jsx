import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatRelativeTime } from '../../utils/helpers';
import Card from '../ui/Card';

const BookCard = ({ book, onDelete }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/editor/${book._id}`);
    };

    const handleView = () => {
        navigate(`/view-book/${book._id}`);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this book?')) {
            onDelete(book._id);
        }
    };

    return (
        <Card hover className="group">
            {/* Cover Image */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-primary/20 to-secondary/20">
                {book.coverImage ? (
                    <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${book.status === 'published'
                            ? 'bg-success/20 text-success border border-success/30'
                            : 'bg-warning/20 text-warning border border-warning/30'
                        }`}>
                        {book.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                </div>
            </div>

            {/* Book Info */}
            <div className="space-y-2 mb-4">
                <h3 className="text-xl font-bold text-text-primary line-clamp-2">
                    {book.title}
                </h3>
                {book.subtitle && (
                    <p className="text-sm text-text-secondary line-clamp-1">
                        {book.subtitle}
                    </p>
                )}
                <p className="text-sm text-text-muted">
                    by {book.author}
                </p>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>{book.chapters?.length || 0} chapters</span>
                    <span>•</span>
                    <span>{formatRelativeTime(book.updatedAt)}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <button
                    onClick={handleEdit}
                    className="flex-1 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
                >
                    Edit
                </button>
                <button
                    onClick={handleView}
                    className="flex-1 px-4 py-2 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors text-sm font-medium"
                >
                    View
                </button>
                <button
                    onClick={handleDelete}
                    className="px-4 py-2 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </Card>
    );
};

export default BookCard;
