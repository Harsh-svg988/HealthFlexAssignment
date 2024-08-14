import React from 'react';
import CommentItem from './CommentItem';
import './styles/CommentList.css';

const CommentList = ({ comments, addReply }) => {
  if (!comments || comments.length === 0) {
    return <p>No comments yet. Be the first to comment!</p>;
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentItem 
          key={comment.id} 
          comment={comment} 
          addReply={addReply} 
          isReply={false} 
        />
      ))}
    </div>
  );
};

export default CommentList;
