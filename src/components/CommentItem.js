import React, { useState } from 'react';
import CommentForm from './CommentForm';
import './styles/CommentItem.css';

const CommentItem = ({ comment, addReply, isReply }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.text);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Implement saving the edited comment here
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Implement delete logic here
  };

  const handleReply = () => {
    setShowReplyForm(!showReplyForm);
  };

  const addNewReply = (reply) => {
    addReply(comment.id, reply);
    setShowReplyForm(false);
  };

  return (
    <div className={`comment-item ${isReply ? 'reply' : ''}`}>
      <div className="comment-content">
        <strong>{comment.name}</strong>
        {isEditing ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <p>{comment.text}</p>
        )}
        <span className="comment-date">{comment.date}</span>
      </div>
      <div className="comment-actions">
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <>
            <button onClick={handleEdit}>Edit</button>
            {!isReply && <button onClick={handleReply}>Reply</button>}
          </>
        )}
        <button onClick={handleDelete} className="delete-button">Delete</button>
      </div>
      {showReplyForm && <CommentForm addComment={addNewReply} />}
      {comment.replies && comment.replies.length > 0 && (
        <div className="replies-list">
          {comment.replies.map((reply) => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              addReply={addReply} 
              isReply={true} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
