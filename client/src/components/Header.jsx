import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';
import logo from '../images/logo.png'
import { PiRocketDuotone } from "react-icons/pi";
import { HiChartPie } from 'react-icons/hi';


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
      
    {/* Text below the image */}
    

    <div className="flex flex-col  items-center justify-center mt-0"> 
  <img 
    src={logo} // Replace 'logo' with the actual path to your image file
    alt="Logo"
    className="w-15 h-11 mb-0 "  // Ensure consistent height and width
  />
<div>
  <span className="text-lg font-bold dark:text-white">INTERN</span>
  <span className="text-lg font-light dark:text-white">POOLS</span>
  </div>
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
         {theme === 'light' ?  <FaSun /> : <FaMoon />}
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
                      <span className='block text-lg normal'>
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
            

            {currentUser && currentUser.isAdmin && (
           <Link to={'/dashboard?tab=profile'}>
           <Dropdown.Item>Dashboard</Dropdown.Item>
         </Link>
        //  /dashboard?tab=posts
        
          )}
          
          {currentUser && (
           <Link to={'/dashboard?tab=posts'}>
           <Dropdown.Item>Your Internships</Dropdown.Item>
         </Link>
        //  /dashboard?tab=posts
        
          )}
        
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
        
        <Navbar.Link className='mt-3' active={path === '/badges'} as={'div'}>
          <Link to='/badges'>Badges</Link>
        </Navbar.Link>

        <Navbar.Link className='mt-3' active={path === '/search'} as={'div'}>
          <Link to='/search'>Internships</Link>
        </Navbar.Link>
        <Navbar.Link className='mt-3' active={path === '/projects'} as={'div'}>
          <Link to='/projects'>Ambassadors</Link>
        </Navbar.Link>
        <Navbar.Link className='mx-0 justify-end' >
        <Button
          className='w-12 h-10 lg:hidden sm:inline align-middle justify-center '
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
        {currentUser && (
          <Link to='/create-post'>
          <Button
              type='button'
              gradientDuoTone='purpleToPink' 
              className='w-full btn  light'
              
            >
              <PiRocketDuotone className='w-6 h-6 mr-2 '/> Create an Internship  
            </Button>
          </Link>)}
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