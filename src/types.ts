export type ContentType = 'question' | 'statement' | 'poll' | 'thread';
export type Tone = 'casual' | 'professional' | 'humorous';
export type Sentiment = 'positive' | 'neutral' | 'controversial';

export interface TweetFormData {
  topic: string;
  keywords: string[];
  tone: Tone;
  targetAudience: string;
  maxLength: number;
  contentType: ContentType;
  sentiment: Sentiment;
  callToAction: boolean;
  includeEmojis: boolean;
  languageStyle: string;
}

export interface GeneratedTweet {
  content: string;
  hashtags: string[];
  engagementScore: number;
  characterCount: number;
}