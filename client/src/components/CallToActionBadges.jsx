import { Button } from 'flowbite-react';
import ambassador from '../images/ambassadorFinal.jpg'

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Want to Become the Ambassador of INTERNPOOLS
            </h2>
            <p className='text-gray-500 my-2'>
            We will soon start giving Ambassadorships.
            </p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'disabled>
                <a href="https://www.100jsprojects.com" target='_blank' rel='noopener noreferrer'>
                    
                </a>COMING SOON
            </Button>
        </div>
        <div className="p-7 flex-1">
            {/* <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" /> */}
            <img src={ambassador} className='rounded-2xl  drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] '/>
        </div>
    </div>
  )
}