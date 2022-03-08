import React from 'react'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {
  const navigate = useNavigate()
  console.log('here')
  return (
    <div className='flex md:p-60 md:static absolute top-60 p-8'>
      <div className='grid'>
        <div className='text-[#A741EB] text-6xl mb-10'>Error</div>
        <div className='text-2xl mb-10'>UH OH! You're lost.</div>
        <div className='text-xl mb-10'>
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back to the
          homepage.
        </div>
        <div
          className='cursor-pointer text-xl rounded-full bg-[#A741EB] w-20 p-2 m-2 flex items-center justify-center'
          onClick={() => navigate('/')}
        >
          Home
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
