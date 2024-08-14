import React, { useState, useEffect } from 'react';
import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';
import './App.css';

const App = () => {
  const [comments, setComments] = useState(() => {
    const storedComments = localStorage.getItem('comments');
    return storedComments ? JSON.parse(storedComments) : [];
  });

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const addComment = (comment) => {
    const newComment = {
      ...comment,
      id: Date.now(),
      date: new Date().toISOString(),
      replies: []
    };
    setComments(prevComments => [...prevComments, newComment]);
  };

  const addReply = (commentId, reply) => {
    const newReply = {
      ...reply,
      id: Date.now(),
      date: new Date().toISOString()
    };
    setComments(prevComments => 
      prevComments.map(comment => 
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      )
    );
  };

  const deleteComment = (id) => {
    setComments(prevComments => 
      prevComments.filter(comment => comment.id !== id)
        .map(comment => ({
          ...comment,
          replies: comment.replies.filter(reply => reply.id !== id)
        }))
    );
  };

  const updateComment = (id, newText) => {
    setComments(prevComments => 
      prevComments.map(comment => 
        comment.id === id
          ? { ...comment, text: newText }
          : {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === id ? { ...reply, text: newText } : reply
              )
            }
      )
    );
  };

  const sortedComments = [...comments].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="app">
      <h1>Comments Section</h1>
      <CommentForm addComment={addComment} isReply={false} />
      <CommentList
        comments={sortedComments}
        addReply={addReply}
        deleteComment={deleteComment}
        updateComment={updateComment}
      />
    </div>
  );
};

export default App;