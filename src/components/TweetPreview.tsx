import React, { useState } from 'react';
import { Edit2, Copy, ThumbsUp, Sparkles, MessageCircle } from 'lucide-react';
import { GeneratedTweet } from '../types';
import toast from 'react-hot-toast';

interface TweetPreviewProps {
  tweet: GeneratedTweet;
}

export default function TweetPreview({ tweet }: TweetPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(tweet.content);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success('Tweet copied to clipboard! ✨', {
      icon: '📋',
      style: {
        background: '#4B5563',
        color: '#fff',
      },
    });
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl p-5 transition-all duration-300">
      <div className="relative">
        {/* Tweet Content */}
        <div className="mb-3">
          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 transition-all duration-300 min-h-[100px] resize-none"
              rows={3}
            />
          ) : (
            <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">{content}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute -right-2 -top-2 flex space-x-1">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors duration-300 opacity-0 group-hover:opacity-100"
            title={isEditing ? "Save" : "Edit"}
          >
            <Edit2 className="h-4 w-4 text-blue-500" />
          </button>
          <button
            onClick={handleCopy}
            className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors duration-300 opacity-0 group-hover:opacity-100"
            title="Copy to clipboard"
          >
            <Copy className="h-4 w-4 text-blue-500" />
          </button>
        </div>

        {/* Tweet Metrics */}
        <div className="flex items-center space-x-4 mt-3 text-sm">
          <div className="flex items-center text-blue-600 dark:text-blue-400">
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span className="font-medium">{tweet.engagementScore}/10</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <MessageCircle className="h-4 w-4 mr-1" />
            <span>{tweet.characterCount}/280</span>
          </div>
        </div>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {tweet.hashtags.map((hashtag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 hover:scale-105 transition-transform duration-300"
            >
              #{hashtag.replace(/^#/, '')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}