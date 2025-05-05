'use client';

import { useState, useEffect } from 'react';
import { useArticles } from '@/context/ArticleContext';
import CategorySelector from '@/components/CategorySelector';
import { FaQuestion } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { BiSolidUpvote } from "react-icons/bi";

export default function Nyaymitra() {
  const { articles, articlesLoading } = useArticles();
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [question, setQuestion] = useState('');
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState({});
  const [upvotes, setUpvotes] = useState({});
  const [answerText, setAnswerText] = useState('');
  const [answers, setAnswers] = useState({});
  const [showAnswerBoxState, setShowAnswerBoxState] = useState({});
  const userId = '6634a8d9d5f1b1a3b4e12f34'; // Dummy userId

  useEffect(() => {
    fetchQuestions();
    const storedComments = localStorage.getItem('nyaymitra-comments');
    if (storedComments) setComments(JSON.parse(storedComments));

    const storedUpvotes = localStorage.getItem('nyaymitra-upvotes');
    if (storedUpvotes) setUpvotes(JSON.parse(storedUpvotes));
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await fetch('/api/question');
      const data = await res.json();
      setSubmittedQuestions(data.questions || []);
      fetchAllAnswers(data.questions || []);
    } catch (err) {
      console.error('Failed to fetch questions:', err);
    }
  };

  const fetchAllAnswers = async (questions) => {
    try {
      const answersData = {};
      for (let q of questions) {
        const res = await fetch(`/api/answer?questionId=${q._id}`);
        const data = await res.json();
        if (data.answers) {
          answersData[q._id] = data.answers;
        }
      }
      setAnswers(answersData);
    } catch (err) {
      console.error("Failed to fetch answers:", err);
    }
  };

  const submitquestion = async () => {
    if (!question.trim()) return;

    try {
      const res = await fetch('/api/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, userId }),
      });

      const data = await res.json();
      setQuestion('');
      fetchQuestions();
    } catch (error) {
      console.error('Failed to post question:', error);
    }
  };

  const handleCommentSubmit = (questionId) => {
    if (!comment.trim()) return;

    const updated = {
      ...comments,
      [questionId]: [...(comments[questionId] || []), comment],
    };
    setComments(updated);
    setComment('');
    localStorage.setItem('nyaymitra-comments', JSON.stringify(updated));
  };

  const handleUpvote = (questionId) => {
    const updated = {
      ...upvotes,
      [questionId]: (upvotes[questionId] || 0) + 1,
    };
    setUpvotes(updated);
    localStorage.setItem('nyaymitra-upvotes', JSON.stringify(updated));
  };

  const handleAnswerSubmit = async (questionId) => {
    if (!answerText.trim()) return;

    try {
      const res = await fetch('/api/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answerText, questionId, userId }),
      });

      if (res.ok) {
        setAnswerText('');
        setShowAnswerBoxState((prevState) => ({
          ...prevState,
          [questionId]: false,
        }));
        alert('Answer posted!');
        fetchAllAnswers(submittedQuestions);
      }
    } catch (err) {
      console.error('Failed to submit answer:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-orange-900 mb-8">Nyay Mitra</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0">
          <CategorySelector
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <div className="flex-grow">
          <div className="bg-orange-200 p-5 rounded-sm">
            <textarea
              className="textarea w-full text-center h-20"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What do you want to ask?"
            ></textarea>

            <div className="flex items-center justify-between mt-2 w-full">
              <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl" onClick={submitquestion}>
                <FaQuestion /> Ask
              </button>
            </div>
          </div>

          {submittedQuestions.map((q) => (
            <div key={q._id} className="mt-4 p-4 bg-orange-100 shadow rounded">
              <h2 className="text-lg font-semibold text-gray-800">You Asked:</h2>
              <p className="text-gray-700 mt-2">{q.question}</p>

              <div className="flex items-center justify-between mt-2 w-full">
                <button className="btn" onClick={() => handleUpvote(q._id)}>
                  <BiSolidUpvote /> Upvote ({upvotes[q._id] || 0})
                </button>
                <button className="btn" onClick={() => setShowAnswerBoxState(prev => ({ ...prev, [q._id]: !prev[q._id] }))}>
                  <TfiWrite /> Answer
                </button>
              </div>

              {showAnswerBoxState[q._id] && (
                <div className="mt-2">
                  <textarea
                    className="textarea w-full h-16 p-2 border border-gray-300 rounded"
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder="Type your answer..."
                  />
                  <button
                    onClick={() => handleAnswerSubmit(q._id)}
                    className="btn btn-md mt-2 bg-green-500 text-white hover:scale-110 transition-transform"
                  >
                    Submit Answer
                  </button>
                </div>
              )}

              <div className="mt-4">
                {answers[q._id] && answers[q._id].length > 0 ? (
                  answers[q._id].map((answer, idx) => (
                    <div key={idx} className="bg-white p-2 rounded border shadow-sm mb-2">
                      <p className="text-sm text-gray-600 font-semibold">
                        Answered by: {answer.userId || 'Unknown User'}
                      </p>
                      <p>{answer.answerText}</p>
                    </div>
                  ))
                ) : (
                  <p>No answers yet. Be the first to answer!</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
