import React, { useState } from 'react';
import type { Item, CreateItemDto, UpdateItemDto } from '../types/item';

interface NoteFormProps {
  initialData?: Item;
  onSubmit: (data: CreateItemDto | UpdateItemDto) => void;
  onCancel: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  const isEditing = !!initialData;

  const validate = (): boolean => {
    const newErrors: { title?: string; content?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!content.trim()) {
      newErrors.content = 'Content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEditing) {
      const dto: UpdateItemDto = {};
      if (title !== initialData.title) dto.title = title.trim();
      if (content !== initialData.content) dto.content = content.trim();
      onSubmit(dto);
    } else {
      onSubmit({ title: title.trim(), content: content.trim() });
    }
  };

  return (
    <div className="note-form-overlay" onClick={onCancel}>
      <form
        className="note-form"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="note-form__title">
          {isEditing ? '✏️ Edit Note' : '📝 Create New Note'}
        </h2>

        <div className="note-form__field">
          <label htmlFor="note-title" className="note-form__label">
            Title
          </label>
          <input
            id="note-title"
            type="text"
            className={`note-form__input ${errors.title ? 'note-form__input--error' : ''}`}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
            }}
            placeholder="Enter note title..."
            autoFocus
          />
          {errors.title && <span className="note-form__error">{errors.title}</span>}
        </div>

        <div className="note-form__field">
          <label htmlFor="note-content" className="note-form__label">
            Content
          </label>
          <textarea
            id="note-content"
            className={`note-form__textarea ${errors.content ? 'note-form__input--error' : ''}`}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (errors.content) setErrors((prev) => ({ ...prev, content: undefined }));
            }}
            placeholder="Write your note content..."
            rows={6}
          />
          {errors.content && <span className="note-form__error">{errors.content}</span>}
        </div>

        <div className="note-form__actions">
          <button type="button" className="btn btn--secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary">
            {isEditing ? 'Update Note' : 'Create Note'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
