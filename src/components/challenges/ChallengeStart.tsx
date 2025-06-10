import React, { useState, useEffect } from 'react';
import { Trophy, Clock, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { Challenge } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface ChallengeStartProps {
  challenge: Challenge;
  onClose: () => void;
  onComplete: (score: number) => void;
}

const ChallengeStart: React.FC<ChallengeStartProps> = ({ challenge, onClose, onComplete }) => {
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState(challenge.timeLimit || 0);
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isStarted, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleAnswer = (isCorrect: boolean) => {
    setAnswers([...answers, isCorrect]);
    if (isCorrect) {
      setScore(prev => prev + challenge.points / 5);
    }
    if (currentQuestion < 4) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete(score);
    }
  };

  if (!isStarted) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center">
            <Trophy className="w-5 h-5 text-amber-500 mr-2" />
            <span className="font-medium">{challenge.points} points</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{challenge.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{challenge.description}</p>

        {challenge.timeLimit && (
          <div className="flex items-center mb-6 text-gray-600 dark:text-gray-400">
            <Clock className="w-5 h-5 mr-2" />
            <span>Time limit: {formatTime(challenge.timeLimit)}</span>
          </div>
        )}

        <button
          onClick={handleStart}
          className="w-full bg-amber-500 text-white rounded-md py-3 font-medium hover:bg-amber-600 transition-colors"
        >
          Start Challenge
        </button>
      </div>
    );
  }

  const questions = [
    {
      question: "What is the main material used in traditional gamelan instruments?",
      options: ["Bronze", "Wood", "Bamboo", "Steel"],
      correct: 0
    },
    {
      question: "Which region is the angklung originally from?",
      options: ["Bali", "West Java", "East Java", "Central Java"],
      correct: 1
    },
    {
      question: "What type of instrument is the sasando?",
      options: ["Percussion", "Wind", "String", "Hybrid"],
      correct: 2
    },
    {
      question: "How many strings does a traditional rebab typically have?",
      options: ["One", "Two", "Three", "Four"],
      correct: 1
    },
    {
      question: "Which Indonesian island is known for the kolintang?",
      options: ["Java", "Sumatra", "Sulawesi", "Kalimantan"],
      correct: 2
    }
  ];

  const currentQ = questions[currentQuestion];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-medium text-gray-900 dark:text-white">
          Question {currentQuestion + 1}/5
        </div>
        {challenge.timeLimit && (
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Clock className="w-5 h-5 mr-2" />
            {formatTime(timeLeft)}
          </div>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {currentQ.question}
        </h3>
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index === currentQ.correct)}
              className="w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-2">
          {answers.map((isCorrect, index) => (
            <span key={index}>
              {isCorrect ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </span>
          ))}
        </div>
        <div>Score: {score}</div>
      </div>
    </div>
  );
};

export default ChallengeStart;