import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';
import logo from '../images/logopngg.png'
import { PiRocketDuotone } from "react-icons/pi";


export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className='border-b-2'>
     <Link
          to='/'
          className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
        >
        {/* <img 
      src={logo} // Replace 'logo' with the actual path to your image file
      alt="Logo"
      className="h-20 w-20 mb-1" // Adjust the size as needed (h-10 w-10 for similar size)
    /> */}

    {/* Text below the image */}
    <div className="flex items-center justify-center mt-5">
      <span className="text-2xl bold dark:text-white">INTERN</span>
      <span className="text-2xl light dark:text-white">POOLS</span>
    </div>
    {/* <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          Muhammad's
        </span> */}
        </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
           <Dropdown.Header>
                    <div className='flex flex-col items-center mt-5 glowing-border'>
                      <Avatar alt='user' img={currentUser.profilePicture} size="lg" rounded className='mb-2 ' />
                      <span className='block text-lg font-semibold'>
                        Salam✨, {currentUser.username}
                      </span>
                    </div>
            </Dropdown.Header>
            <Dropdown.Header>
              {/* <span className='block text-sm'>@{currentUser.username}</span> */}
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link className='mt-3' active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        
        <Navbar.Link className='mt-3' active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link className='mt-3' active={path === '/projects'} as={'div'}>
          <Link to='/projects'>Ambassadors</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/create-post'>
          <Button
              type='button'
              gradientDuoTone='purpleToPink' 
              className='w-full btn  light'
              
            >
              <PiRocketDuotone className='w-6 h-6 mr-2 '/> Create an Internship  
            </Button>
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
  
}

// {currentUser.isAdmin && (
//   <Link to={'/create-post'}>
//     <Button
//       type='button'
//       gradientDuoTone='purpleToPink'
//       className='w-full'
//     >
//       Create a post
//     </Button>
//   </Link>