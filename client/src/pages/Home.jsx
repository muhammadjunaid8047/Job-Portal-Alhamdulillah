import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [randomQuote, setRandomQuote] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The best way to predict the future is to invent it. - Alan Kay",
    "Code is like humor. When you have to explain it, it's bad. - Cory House",
    "First, solve the problem. Then, write the code. - John Johnson",
    "The most disastrous thing that you can ever learn is your first programming language. - Alan Kay"
  ];

  useEffect(() => {
    setRandomQuote(quotes[quoteIndex]);

    if (isTyping) {
      const typingInterval = setInterval(() => {
        setDisplayedText((prev) => {
          if (prev.length < randomQuote.length) {
            return randomQuote.slice(0, prev.length + 1);
          } else {
            clearInterval(typingInterval);
            setIsTyping(false); // Stop typing and start pause timer
            return prev;
          }
        });
      }, 80); // Adjust typing speed here

      return () => clearInterval(typingInterval);
    } else {
      // Delay after typing is complete before switching to next quote
      const pauseAfterTyping = setTimeout(() => {
        setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setDisplayedText(''); // Reset displayed text for new quote
        setIsTyping(true); // Start typing next quote
      }, 6000); // Pause time in milliseconds after full quote is typed

      return () => clearTimeout(pauseAfterTyping);
    }
  }, [quoteIndex, randomQuote, isTyping]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  
  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to Intern Pools</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          Here you'll find a variety of Internships
        </p>
        <div className="quote-container">
          <blockquote className="quote">
            {displayedText}
          </blockquote>
        </div>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View all Internships
        </Link>
      </div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Internships</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all internships
            </Link>
          </div>
        )}
      </div>
      <style jsx>{`
        .quote-container {
          // width: 300px
          max-width: 500px;
          // margin: 2rem 0;
          // padding: 1rem;
          // background-color: #f8f8f8;
          border-radius: 8px;
          // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          float: left;
        }
        .quote {
          font-size: 1.0rem;
          line-height: 1.6;
          // color: #333;
          font-style: italic;
          border-left: 4px solid #38b2ac;
          padding-left: 0.6rem;
        }
      `}</style>
    </div>
  );
}
