import React from 'react'
import { AiOutlineComment } from 'react-icons/ai'
import { MdCancelPresentation } from 'react-icons/md'

function CommentModal() {
  return (
    <div>
         <button
                    className="cursor-pointer"
                    onClick={() => document.getElementById("my_modal_2").showModal()}
                  >
                    <AiOutlineComment size={25} />
                  </button>
                    
       <dialog id="my_modal_2" className="modal">
                  <div className="modal-box">
                   <div  className='flex flex-col gap-3'>
                 {
                    [1,2,3, 4, 5,6].map((data , index)=>{
                        return   <div key={index} className="flex flex-col gap-2">
                        <div className='flex gap-2 items-center '>
                        <img
                             className="w-10 h-10 rounded-full object-cover "
                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQksR3Lt2Iy2rlmUKvJmc27GcXpe297gINhTA&s"
                             alt=""
                           />
                           <p className="text-lg font-bold">shazan.@gmail.com</p>
                        </div>
                           <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam odio ipsam exercitationem! Dolorem molestias nulla modi tempora molestiae error, </p>
                        </div>
                    })
                 }
                 </div>
                   
                    <div className="modal-action">
                    <form method="dialog">
                        <button className="cursor-pointer ">
                          <MdCancelPresentation size={25}/>
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
    </div>
  )
}

export default CommentModal
