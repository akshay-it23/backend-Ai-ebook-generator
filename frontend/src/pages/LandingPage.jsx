import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float animation-delay-300" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float animation-delay-500" />
        </div>

        <div className="container-custom py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo/Brand */}
            <div className="mb-8 animate-fadeInDown">
              <h1 className="text-6xl md:text-8xl font-bold mb-4">
                <span className="gradient-text">AI E-Book</span>
              </h1>
              <h2 className="text-4xl md:text-6xl font-bold text-text-primary">
                Creator
              </h2>
            </div>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto animate-fadeInUp animation-delay-200">
              Create stunning e-books with AI-powered content generation.
              Write, edit, and publish your masterpiece in minutes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp animation-delay-300">
              <Link to="/signup">
                <Button size="lg" variant="primary" className="min-w-[200px]">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="min-w-[200px]">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container-custom">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Powerful Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card-hover animate-fadeInUp">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-text-primary">AI-Powered Writing</h3>
              <p className="text-text-secondary">
                Generate high-quality chapters with advanced AI. Just provide a topic and let AI do the heavy lifting.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-hover animate-fadeInUp animation-delay-200">
              <div className="w-16 h-16 rounded-2xl gradient-secondary flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-text-primary">Rich Text Editor</h3>
              <p className="text-text-secondary">
                Craft your content with a beautiful, intuitive editor. Full control over formatting and structure.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-hover animate-fadeInUp animation-delay-400">
              <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-text-primary">Export Anywhere</h3>
              <p className="text-text-secondary">
                Download your e-books as PDF or DOCX. Professional formatting ready for publishing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section bg-gradient-to-b from-transparent to-bg-secondary/50">
        <div className="container-custom">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            How It Works
          </h2>

          <div className="max-w-3xl mx-auto space-y-12">
            {/* Step 1 */}
            <div className="flex gap-6 items-start animate-fadeInUp">
              <div className="flex-shrink-0 w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-text-primary">Create Your Book</h3>
                <p className="text-text-secondary">
                  Start by creating a new book project. Add a title, subtitle, and author information.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 items-start animate-fadeInUp animation-delay-200">
              <div className="flex-shrink-0 w-12 h-12 rounded-full gradient-secondary flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-text-primary">Generate Content</h3>
                <p className="text-text-secondary">
                  Use AI to generate chapters or write your own. Edit and refine until perfect.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 items-start animate-fadeInUp animation-delay-400">
              <div className="flex-shrink-0 w-12 h-12 rounded-full gradient-accent flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-text-primary">Export & Publish</h3>
                <p className="text-text-secondary">
                  Download your finished e-book as PDF or DOCX and share it with the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container-custom">
          <div className="glass-strong rounded-3xl p-12 md:p-16 text-center glow">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">
              Ready to Create Your E-Book?
            </h2>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Join thousands of authors using AI to bring their stories to life.
            </p>
            <Link to="/signup">
              <Button size="lg" variant="primary" className="min-w-[250px]">
                Start Writing Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container-custom">
          <div className="text-center text-text-muted">
            <p>&copy; 2026 AI E-Book Creator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
