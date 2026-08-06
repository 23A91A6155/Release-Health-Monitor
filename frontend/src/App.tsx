import React, { useState, useEffect, useCallback } from 'react';
import * as Sentry from '@sentry/react';
import type { Item, CreateItemDto, UpdateItemDto } from './types/item';
import * as api from './services/api';
import Header from './components/Header';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import ErrorPanel from './components/ErrorPanel';
import LoadingSpinner from './components/LoadingSpinner';
import { ToastContainer, type ToastData } from './components/Toast';

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | undefined>(undefined);
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getItems();
      setItems(data);
    } catch {
      addToast('Failed to load notes. Is the backend running?', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleCreate = async (data: CreateItemDto | UpdateItemDto) => {
    try {
      const created = await api.createItem(data as CreateItemDto);
      setItems((prev) => [created, ...prev]);
      setShowForm(false);
      addToast('Note created successfully!', 'success');
    } catch {
      addToast('Failed to create note', 'error');
    }
  };

  const handleUpdate = async (data: CreateItemDto | UpdateItemDto) => {
    if (!editingItem) return;
    try {
      const updated = await api.updateItem(editingItem.id, data as UpdateItemDto);
      setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      setEditingItem(undefined);
      setShowForm(false);
      addToast('Note updated successfully!', 'success');
    } catch {
      addToast('Failed to update note', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      addToast('Note deleted successfully!', 'success');
    } catch {
      addToast('Failed to delete note', 'error');
    }
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(undefined);
  };

  const handleNewNote = () => {
    setEditingItem(undefined);
    setShowForm(true);
  };

  return (
    <Sentry.ErrorBoundary
      fallback={({ error, resetError }) => (
        <div className="error-boundary">
          <div className="error-boundary__content">
            <h2 className="error-boundary__title">🚨 Something went wrong</h2>
            <p className="error-boundary__message">
              {error?.toString() || 'An unexpected error occurred'}
            </p>
            <button className="btn btn--primary" onClick={resetError}>
              Try Again
            </button>
          </div>
        </div>
      )}
    >
      <div className="app">
        <Header />

        <main className="app__container">
          <ErrorPanel onToast={addToast} />

          <section className="app__content">
            <div className="app__toolbar">
              <h2 className="app__section-title">
                📒 My Notes
                <span className="app__count">{items.length}</span>
              </h2>
              <button className="btn btn--primary" onClick={handleNewNote} id="btn-new-note">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                New Note
              </button>
            </div>

            {loading ? (
              <LoadingSpinner message="Loading your notes..." />
            ) : (
              <NoteList items={items} onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </section>
        </main>

        {showForm && (
          <NoteForm
            initialData={editingItem}
            onSubmit={editingItem ? handleUpdate : handleCreate}
            onCancel={handleCancel}
          />
        )}

        <ToastContainer toasts={toasts} onClose={removeToast} />
      </div>
    </Sentry.ErrorBoundary>
  );
};

export default App;
