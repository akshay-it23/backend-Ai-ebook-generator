import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/layout/DashboardLayout';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
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
    await updateUser(formData);
    setLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Profile Settings</span>
          </h1>
          <p className="text-text-secondary">Manage your account information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info Card */}
          <Card className="lg:col-span-1">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full gradient-secondary flex items-center justify-center text-white text-3xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-1">{user?.name}</h3>
              <p className="text-sm text-text-muted mb-4">{user?.email}</p>
              {user?.isPro && (
                <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                  Pro Member
                </span>
              )}
            </div>
          </Card>

          {/* Edit Form */}
          <Card className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6 text-text-primary">Edit Profile</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                error={errors.name}
                required
              />

              <InputField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                error={errors.email}
                required
              />

              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  disabled={loading}
                  className="w-full sm:w-auto"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl gradient-primary flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-text-muted text-sm mb-1">Books Created</p>
              <p className="text-2xl font-bold text-text-primary">-</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl gradient-secondary flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-text-muted text-sm mb-1">Chapters Written</p>
              <p className="text-2xl font-bold text-text-primary">-</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl gradient-accent flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-text-muted text-sm mb-1">AI Generations</p>
              <p className="text-2xl font-bold text-text-primary">-</p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
