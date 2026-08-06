import React from 'react';
import type { Item } from '../types/item';
import NoteCard from './NoteCard';

interface NoteListProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({ items, onEdit, onDelete }) => {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
        <h3 className="empty-state__title">No notes yet</h3>
        <p className="empty-state__text">
          Create your first note by clicking the + button below
        </p>
      </div>
    );
  }

  return (
    <div className="note-grid">
      {items.map((item) => (
        <NoteCard key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default NoteList;
