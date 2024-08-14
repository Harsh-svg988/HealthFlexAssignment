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
    updateComment(comment.id, text);
    setIsEditing(false);
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
    const date = moment(dateString, 'YYYY-MM-DD HH:mm:ss');
    if (date.isValid()) {
      return date.format('DD/MM/YYYY HH:mm');
    } else {
      return 'Invalid date';
    }
  };

  return (
    <div className={`comment-item ${isReply ? 'reply' : ''}`}>
      <div className="date">{formatDate(comment.date)}</div>
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
      </div>
      <div className="comment-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={handleEdit}>Edit</button>
            {!isReply && <button onClick={handleReply}>Reply</button>}
          </>
        )}
        <button onClick={handleDelete} className="delete-button">
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
      {showReplyForm && <CommentForm addComment={addNewReply} isReply={true} />}
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
