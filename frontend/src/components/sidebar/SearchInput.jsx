import React, { useState } from 'react'
import {IoSearchSharp} from 'react-icons/io5'
import useConversation from '../../zustand/useConversation'
import useGetConversations from '../../hooks/useGetConversation'
import toast from 'react-hot-toast'
import logo from '../../assets/logo.png'

function SearchInput() {
  const [search, setSearch] = useState("")
  const {setSelectedConversation} = useConversation()
  const {conversations} = useGetConversations()

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!search){
      return
    }

    const conversation = conversations.find((conversation)=> 
      conversation.username.toLowerCase().includes(search.toLowerCase())
    )

    if(conversation){
      setSelectedConversation(conversation)
      setSearch("")
    } else {
      toast.error("No User found with this username")
    }
  }

  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
        <img src={`${logo}`} alt="logo" className='w-14 h-14' />
        <input type="text" placeholder='Search..' className='input input-bordered rounded-full' 
        value={search}
        onChange={(e)=>setSearch(e.target.value)}/>
        <button type="submit" className='btn btn-circle bg-sky-600 text-white'>
            <IoSearchSharp className='w-6 h-6 outline-none'/>
        </button>

    </form>
  )
}

export default SearchInput