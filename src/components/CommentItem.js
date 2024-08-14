import React, { useState } from 'react';
import CommentForm from './CommentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faReply } from '@fortawesome/free-solid-svg-icons';
import './styles/CommentItem.css';
import moment from 'moment';

const CommentItem = ({ comment, addReply, deleteComment, updateComment, isReply }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.text);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    if (text.trim()) {
      updateComment(comment.id, text);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    deleteComment(comment.id);
  };

  const handleReply = () => {
    setShowReplyForm(!showReplyForm);
  };

  const addNewReply = (reply) => {
    addReply(comment.id, reply);
    setShowReplyForm(false);
  };

  const formatDate = (dateString) => {
    return moment(dateString).format('DD MMM YYYY');
  };

  return (
    <div className={`comment-item ${isReply ? 'reply' : ''}`}>
      <div className="comment-header">
        <span className="comment-name">{comment.name}</span>
        <span className="comment-date">{formatDate(comment.date)}</span>
      </div>
      <div className="comment-content">
        {isEditing ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <p>{comment.text}</p>
        )}
      </div>
      <div className="comment-actions">
        {!isReply && <button onClick={handleReply}>Reply</button>}
        <button onClick={handleEdit}>Edit</button>
      </div>
      <button onClick={handleDelete} className="delete-button">
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
      {showReplyForm && (
        <div className="reply-form">
          <CommentForm addComment={addNewReply} isReply={true} />
        </div>
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div className="replies-list">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              addReply={addReply}
              deleteComment={deleteComment}
              updateComment={updateComment}
              isReply={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;