import React from 'react'
import Feed from '../components/Feed'

function HomePage() {
  return (
    <div className='flex flex-col gap-10 '>
      {[1, 2, 3, 4, 5].map((data , index)=>{
        return <Feed  data={data} key={index}/>
      })}
    </div>
  )
}

export default HomePage
