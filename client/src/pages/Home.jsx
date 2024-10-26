import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [randomQuote, setRandomQuote] = useState('');
  
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
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  }, []);
  
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
        <div className="">
          <blockquote className="quote">
            {randomQuote}
          </blockquote>
          <style jsx>{`
            .quote-container {
              max-width: ;
              margin: 0rem auto;
              padding: 0.2rem;
              // background-color: #f8f8f8;
              // border-radius: 0px;
              float: left;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .quote {
              font-size: 1rem;
              line-height: 1.6;
              // color: #333;
              font-style: italic;
              border-left: 4px solid #3498db;
              padding-left: 0.3rem;
            }
          `}</style>
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
    </div>
  );
}
