import { Footer } from 'flowbite-react';
import logo from '../images/logoo-01.svg'

import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble,BsLinkedin,BsWhatsapp } from 'react-icons/bs';
export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-1'>
         
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
            >
               <img 
            src={logo} // Replace with actual logo path
            alt="Logo"
            className="w-20 h-[80px] mb-0 ml-8" />
              <div className="flex items-center mt-0">
                
                
                  <span className="text-1xl bold dark:text-white">INTERN</span>
                  <span className="text-1xl light dark:text-white">POOLS</span>
                </div>
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='about' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  About us
                </Footer.Link>
                <Footer.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                >
               Contact us
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Follow us' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://www.github.com/sahandghavidel'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  LinkedIn
                </Footer.Link>
                <Footer.Link href='#'>Facebook</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="InternPools"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='#' icon={BsFacebook}/>
            {/* <Footer.Icon href='#' icon={BsInstagram}/> */}
            <Footer.Icon href='#' icon={BsLinkedin}/>
            {/* <Footer.Icon href='https://github.com/sahandghavidel' icon={BsGithub}/> */}
            <Footer.Icon href='#' icon={BsWhatsapp}/>

          </div>
        </div>
      </div>
    </Footer>
  );
}
