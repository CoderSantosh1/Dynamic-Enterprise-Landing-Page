'use client';

import { useState, useEffect } from 'react';

interface Content {
  _id?: string;
  heroTitle: string;
  subtitle: string;
  ctaText: string;
  stats: Array<{ label: string; value: string }>;
}

const defaultContent: Content = {
  heroTitle: 'Build smarter systems for modern growth.',
  subtitle:
    'We help enterprise teams align strategy, operations, and digital transformation to unlock measurable performance.',
  ctaText: 'Book a strategy call',
  stats: [
    { label: 'Global clients', value: '120+' },
    { label: 'Average ROI uplift', value: '32%' },
    { label: 'Transformation programs', value: '260' },
    { label: 'Market response', value: '4.9/5' }
  ]
};

export default function AdminPage() {
  const [content, setContent] = useState<Content>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const fetchContent = async () => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    try {
      const response = await fetch(`${apiBaseUrl}/api/content`);
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem('eminenture-admin-auth') === 'true';
    setIsAuthenticated(storedAuth);

    if (storedAuth) {
      fetchContent();
      return;
    }

    setLoading(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatChange = (index: number, field: 'label' | 'value', value: string) => {
    setContent((prev) => {
      const newStats = [...prev.stats];
      newStats[index] = { ...newStats[index], [field]: value };
      return { ...prev, stats: newStats };
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    const email = loginForm.email.trim().toLowerCase();
    const password = loginForm.password;
    const validEmails = ['admin@gmail.com', 'admin@gmai.com'];

    if (validEmails.includes(email) && password === 'admin@123') {
      localStorage.setItem('eminenture-admin-auth', 'true');
      setIsAuthenticated(true);
      setLoading(true);
      fetchContent();
      return;
    }

    setLoginError('Invalid email or password. Use admin@gmail.com / admin@123');
    setLoginLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('eminenture-admin-auth');
    setIsAuthenticated(false);
    setLoginForm({ email: '', password: '' });
    setLoginError('');
    setMessage('');
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${apiBaseUrl}/api/content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
      });

      if (response.ok) {
        setMessage('✓ Content updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('✗ Failed to update content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      setMessage('✗ Error updating content');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setContent(defaultContent);
    setMessage('');
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl shadow-emerald-500/10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-2xl font-bold text-emerald-300 ring-1 ring-emerald-400/30">
              E
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Login</h1>
            <p className="mt-2 text-sm text-slate-400">Secure access to content management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="admin@gmail.com"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="admin@123"
                required
              />
            </div>

            {loginError && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full rounded-full bg-emerald-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-60"
            >
              {loginLoading ? 'Signing in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p>Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/95 backdrop-blur-sm sticky top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-lg font-bold text-emerald-300 ring-1 ring-emerald-400/30">
              E
            </div>
            <div>
              <div className="text-lg font-semibold tracking-wide text-white">Eminenture Admin</div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-slate-400">Content Management</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-emerald-400/60 hover:text-white"
            >
              Logout
            </button>
            <a
              href="/"
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-emerald-400/60 hover:text-white"
            >
              ← Back to Home
            </a>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Landing Page Content Manager</h1>
          <p className="text-slate-400">
            Edit the content below and click Save to update the live landing page in real time.
          </p>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-xl border ${
              message.startsWith('✓')
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                : 'border-red-500/30 bg-red-500/10 text-red-300'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Hero Section */}
          <section className="rounded-2xl border border-white/10 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-emerald-400">◆</span> Hero Section
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Main Headline (Hero Title)
                </label>
                <input
                  type="text"
                  name="heroTitle"
                  value={content.heroTitle}
                  onChange={handleInputChange}
                  className="w-full rounded-xl bg-slate-950 border border-white/10 px-4 py-3 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Enter hero title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Subtitle
                </label>
                <textarea
                  name="subtitle"
                  value={content.subtitle}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full rounded-xl bg-slate-950 border border-white/10 px-4 py-3 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                  placeholder="Enter subtitle"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  CTA Button Text
                </label>
                <input
                  type="text"
                  name="ctaText"
                  value={content.ctaText}
                  onChange={handleInputChange}
                  className="w-full rounded-xl bg-slate-950 border border-white/10 px-4 py-3 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Enter CTA text"
                />
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="rounded-2xl border border-white/10 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-emerald-400">◆</span> Stats & Metrics
            </h2>

            <div className="space-y-6">
              {content.stats.map((stat, index) => (
                <div key={index} className="rounded-xl bg-slate-950 p-6 border border-white/5">
                  <h3 className="text-sm font-semibold text-emerald-400 mb-4">Metric {index + 1}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                        Label
                      </label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                        className="w-full rounded-lg bg-slate-900 border border-white/10 px-3 py-2 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="e.g., Global clients"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                        Value
                      </label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                        className="w-full rounded-lg bg-slate-900 border border-white/10 px-3 py-2 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="e.g., 120+"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex gap-4 sticky bottom-0 bg-slate-950 py-4 -mx-6 px-6 border-t border-white/10">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : '✓ Save Changes'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-emerald-400/60 hover:text-white"
            >
              Reset
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
