import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'all',
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
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
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');

    // Set sidebar data based on URL parameters
    setSidebarData({
      searchTerm: searchTermFromUrl || '',
      sort: sortFromUrl || 'desc',
      category: categoryFromUrl || 'all',
    });

    fetchPosts(urlParams);
  }, [location.search]);

  const fetchPosts = async (urlParams) => {
    setLoading(true);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      setLoading(false);
      return;
    }
    
    const data = await res.json();
    setPosts(data.posts);
    setLoading(false);
    setShowMore(data.posts.length === 9);
  };

  const handleChange = (e) => {
    setSidebarData({ ...sidebarData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    if (sidebarData.category !== 'all') {
      urlParams.set('category', sidebarData.category);
    }
    navigate(`/search?${urlParams.toString()}`);
  };

  const handleShowMore = async () => {
    const startIndex = posts.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const res = await fetch(`/api/post/getposts?${urlParams.toString()}`);
    if (!res.ok) return;

    const data = await res.json();
    setPosts((prevPosts) => [...prevPosts, ...data.posts]);
    setShowMore(data.posts.length === 9);
  };

  const handleResetFilters = () => {
    setSidebarData({
      searchTerm: '',
      sort: 'desc',
      category: 'all',
    });
    navigate('/search'); // Navigate to search without any filters
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap poppins-regular'>Search Term:</label>
            <TextInput
              placeholder='Search...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='poppins-regular'>Sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
              <option value='desc'>Latest</option>
              <option value='asc'>Oldest</option>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='poppins-regular'>Location:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id='category'
            >
              <option value='all'>All Locations</option>
             
              <option value='WorkFromHome'>Work From Home</option>
              <option value='Islamabad'>Islamabad</option>
              <option value='Karachi'>Karachi</option>
              <option value='Lahore'>Lahore</option>
              <option value='Other'>Other</option>
            </Select>
          </div>
          <div className='flex gap-4'>
            <Button type='submit' outline gradientDuoTone='purpleToPink'>
              Apply Filters
            </Button>
            {/* <Button outline gradientDuoTone='purpleToPink' onClick={handleResetFilters}>
            All Internships
            </Button> */}
          </div>
        </form>
      </div>
      <div className='w-full'>
        <div className='sm:border-b border-gray-500'>
        <h1 className='text-3xl poppins-regular p-3 mt-5 '>
          Internships:
        </h1>
        <div className="p-3 quote-container poppins-light">
          <blockquote className="quote">
            {displayedText}
          </blockquote>
        </div></div>
        

        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && posts.length === 0 && (
            <p className='text-xl text-gray-500'>No Internships found.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}
          {!loading &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className='text-teal-500 text-lg hover:underline p-7 w-full'
            >
              Show More
            </button>
          )}
        </div>
      </div>
      <style jsx>{`
        .quote-container {
          // max-width: 600px;
          border-radius: 8px;
          // float: left;
        }
        .quote {
          font-size: 1.0rem;
          line-height: 1.2;
          font-style: italic;
          border-left: 4px solid #38b2ac;
          padding-left: 0.6rem;
        }
      `}</style>
    </div>
  );
}