// import CallToAction from '../components/CallToAction';
import CallToActionBadges from '../components/CallToActionBadges';
import badges from '../images/Badgess.jpg'

export default function Projects() {
  return (
    
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-2 p-3'>
      {/* <h1 className='text-3xl font-semibold'>InternPools </h1> */}
      

      <span className="text-3xl light dark:text-white inline-block">Badges</span>
      <p className='text-md text-gray-500'>Coming Soon</p>
      <div className= ' border rounded-tl-3xl rounded-br-3xl border-teal-500'>
      <p className='text-lg text-gray-500 normal p-5  text-center '>We’re excited to launch a skills certification program, where you can earn professional titles, such as 'Full Stack Engineer,' 
        upon successfully passing the test. Participants who qualify will also have the opportunity to become official ambassadors for InternPools! </p>
        <img src={badges} className='rounded-2xl  drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]' /></div>
  
      {/* <CallToActionBadges /> */}
    </div>
  )
}