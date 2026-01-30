import React, { useState } from 'react';
import Modal from '../ui/Modal';
import InputField from '../ui/InputField';
import TextareaField from '../ui/TextareaField';
import Button from '../ui/Button';
import api from '../../utils/api';
import { API_ENDPOINTS } from '../../utils/constants';
import toast from 'react-hot-toast';

const CreateBookModal = ({ isOpen, onClose, onBookCreated }) => {
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        author: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.author.trim()) {
            newErrors.author = 'Author name is required';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            const response = await api.post(API_ENDPOINTS.BOOKS, formData);
            toast.success('Book created successfully!');
            onBookCreated(response.book);
            handleClose();
        } catch (error) {
            toast.error(error.message || 'Failed to create book');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({ title: '', subtitle: '', author: '' });
        setErrors({});
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Create New Book"
            size="md"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                    label="Book Title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter book title"
                    error={errors.title}
                    required
                />

                <TextareaField
                    label="Subtitle (Optional)"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                    placeholder="Enter subtitle"
                    rows={2}
                />

                <InputField
                    label="Author"
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Enter author name"
                    error={errors.author}
                    required
                />

                <div className="flex gap-4 pt-4">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={handleClose}
                        className="flex-1"
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        className="flex-1"
                        loading={loading}
                        disabled={loading}
                    >
                        Create Book
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateBookModal;
