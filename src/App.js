import React, { useState, useEffect } from 'react';
import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';
import './App.css';
import { useLocalStorage } from 'react-use';

const App = () => {
  const [comments, setComments] = useLocalStorage('comments', []);

  // Load comments from localStorage on component mount
  useEffect(() => {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      console.log('Loading comments:', JSON.parse(storedComments));
      setComments(JSON.parse(storedComments));
    }
  }, []);

  // Save comments to localStorage whenever they change
  useEffect(() => {
    console.log('Saving comments:', comments);
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const addComment = (comment) => {
    setComments([...comments, { ...comment, id: Date.now(), replies: [] }]);
  };

  const addReply = (commentId, reply) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, { ...reply, id: Date.now(), replies: [] }],
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const deleteComment = (id) => {
    const deleteRecursively = (commentsList) => {
      return commentsList
        .filter(comment => comment.id !== id)
        .map(comment => ({
          ...comment,
          replies: deleteRecursively(comment.replies),
        }));
    };

    setComments(deleteRecursively(comments));
  };

  const updateComment = (id, newText) => {
    const updateRecursively = (commentsList) => {
      return commentsList.map(comment => {
        if (comment.id === id) {
          return { ...comment, text: newText };
        }
        return {
          ...comment,
          replies: updateRecursively(comment.replies),
        };
      });
    };

    setComments(updateRecursively(comments));
  };

  return (
    <div className="app">
      <CommentForm addComment={addComment} isReply={false} />
      <CommentList comments={comments} addReply={addReply} deleteComment={deleteComment} updateComment={updateComment} />
    </div>
  );
};

export default App;
