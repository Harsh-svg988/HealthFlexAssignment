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

  return (
    <div className="app">
      <CommentForm addComment={addComment} />
      <CommentList comments={comments} addReply={addReply} />
    </div>
  );
};

export default App;
