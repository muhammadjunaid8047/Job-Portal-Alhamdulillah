'use client'

import { Link } from 'react-router-dom'
import CallToAction from '../components/CallToAction'
import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import sss from '../images/sss.png'


export default function Home() {
  const [posts, setPosts] = useState([])
  const [displayedText, setDisplayedText] = useState('')
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  const quotes = [ 
    "Indeed, Allah is with us. - Quran",
    "So whoever does an atom’s weight of good will see it. - Quran",
    "Do not lose heart or despair - if you are true believers you have the upper hand. - Quran",
    "Allah does not burden any soul with more than it can bear. - Quran",
    "Indeed, I am near. - Quran",
    "So truly where there is hardship there is also ease. - Quran",
    "The wing of the Falcon brings to the king, the wing of the crow brings him to the cemetery. - Muhammad Iqbal",
    "The ultimate aim of the ego is not to see something, but to be something. - Muhammad Allama Iqbal",
    "Be aware of your own worth, use all of your power to achieve it. Create an ocean from a dewdrop. Do not beg for light from the moon, obtain it from the spark within you. - Muhammad Allama Iqbal",
    "If one cannot live the life of the brave, then it is better to die like the brave. - Muhammad Allama Iqbal",
    "From your past emerges the present, and from the present is born your future. - Muhammad Allama Iqbal",
    "The ultimate aim of the ego is not to see something, but to be something. - Muhammad Allama Iqbal",
    "The strongest among you is the one who does not lose hope in the mercy of Allah.",
    "The believers are like one body; if one part of the body suffers, the whole body feels the pain. - Muhammad ﷺ",
    "Be in this world as if you are a stranger or a traveler. - Muhammad ﷺ",
    "Never lose hope in Allah's mercy, for He is always closer to you than you think.",
    "Work hard and have faith; the fruits of your labor will surely follow.",
    "I am with the Believer when he remembers Me. - Quran",
    "When My servants ask you O Prophet about Me tell them I am truly near. - Quran",
    "Seek knowledge from cradle to the grave. - Muhammad ﷺ",
    "Surely Allah does not change the condition of a people until they change their own condition. - Quran 13:11",
    "No two things have been combined better than knowledge and patience. - Prophet Muhammad ﷺ",
    "When a thing disturbs the peace of your heart give it up. - Prophet Muhammad ﷺ",
    "When you see a person who has been given more than you in money and beauty. Look to those, who have been given less. - Prophet Muhammad (peace be upon him)",
    "Impossible is temporary. Impossible is nothing. - Muhammad Ali",
    "If my mind can conceive it, if my heart can believe it—then I can achieve it. - Muhammad Ali",
    "A man who has no imagination has no wings. - Muhammad Ali",
    "It's not the mountains that slow you down; it's the stone in your shoe. - Muhammad Ali",
    "I'm so mean, I make medicine sick. - Muhammad Ali",
    "Live every day as if it were your last because someday you're going to be right. - Muhammad Ali",
    "I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.' - Muhammad Ali",
    "Champions aren't made in gyms. Champions are made from something they have deep inside them—a desire, a dream, a vision. They have to have the skill, and the will. But the will must be stronger than the skill. - Muhammad Ali",
    "The best way to make your dreams come true is to wake up. - Muhammad Ali",
    "The service you do for others is the rent you pay for your room here on Earth. - Muhammad Ali",
    "What you're thinking is what you're becoming. - Muhammad Ali",
    "I believe in the religion of Islam. I believe in Allah and peace. - Muhammad Ali"
];



  useEffect(() => {
    setQuoteIndex(Math.floor(Math.random() * quotes.length))
  }, [])

  useEffect(() => {
    const currentQuote = quotes[quoteIndex]

    if (isTyping) {
      const typingInterval = setInterval(() => {
        setDisplayedText((prev) => {
          if (prev.length < currentQuote.length) {
            return currentQuote.slice(0, prev.length + 1)
          } else {
            clearInterval(typingInterval)
            setIsTyping(false) 
            return prev
          }
        })
      }, 80) 

      return () => clearInterval(typingInterval)
    } else {
      const pauseAfterTyping = setTimeout(() => {
        setQuoteIndex((prevIndex) => {
          let newIndex
          do {
            newIndex = Math.floor(Math.random() * quotes.length)
          } while (newIndex === prevIndex)
          return newIndex
        })
        setDisplayedText('') 
        setIsTyping(true)
      }, 3000)

      return () => clearTimeout(pauseAfterTyping)
    }
  }, [quoteIndex, isTyping])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts')
      const data = await res.json()
      setPosts(data.posts)
    }
    fetchPosts()
  }, [])
  
  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to Intern Pools</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          Here you'll find a alot of Internships
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
          max-width: 600px;
          border-radius: 8px;
          float: left;
        }
        .quote {
          font-size: 1.0rem;
          line-height: 1.6;
          font-style: italic;
          border-left: 4px solid #38b2ac;
          padding-left: 0.6rem;
        }
      `}</style>
    </div>
  )
}