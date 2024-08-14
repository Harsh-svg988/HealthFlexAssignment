import React, { useState } from 'react';
import './styles/CommentForm.css';

const CommentForm = ({ addComment, isReply }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim() || !text.trim()) {
      setError('Both name and comment are required.');
      return;
    }

    addComment({ name, text });
    setName('');
    setText('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <h3>{isReply ? 'Reply' : 'Comment'}</h3>
      {error && <p className="error">{error}</p>}
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
        placeholder={isReply ? "Your reply" : "Your comment"}
        required
      />
      <button type="submit">{isReply ? 'Post Reply' : 'Post Comment'}</button>
    </form>
  );
};

export default CommentForm;