import React from 'react';
import type { Item } from '../types/item';

interface NoteCardProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ item, onEdit, onDelete }) => {
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateContent = (text: string, maxLength: number = 150): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '…';
  };

  return (
    <div className="note-card">
      <div className="note-card__header">
        <h3 className="note-card__title">{item.title}</h3>
      </div>
      <p className="note-card__content">{truncateContent(item.content)}</p>
      <div className="note-card__meta">
        <span className="note-card__date" title={`Created: ${formatDate(item.createdAt)}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {formatDate(item.updatedAt)}
        </span>
      </div>
      <div className="note-card__actions">
        <button
          className="btn btn--sm btn--outline"
          onClick={() => onEdit(item)}
          aria-label={`Edit ${item.title}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit
        </button>
        <button
          className="btn btn--sm btn--danger-outline"
          onClick={() => onDelete(item.id)}
          aria-label={`Delete ${item.title}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
