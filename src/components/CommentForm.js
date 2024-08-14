import React, { useState } from 'react';
import './styles/CommentForm.css';

const CommentForm = ({ addComment }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !text.trim()) {
      return; // Don't submit empty fields
    }

    const newComment = {
      name,
      text,
      date: new Date().toLocaleString(),
    };

    addComment(newComment);

    setName('');
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        required
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your comment"
        required
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;
