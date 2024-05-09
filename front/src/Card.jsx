
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
function Card() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [err, setErr] = useState('');
  const [data, setData] = useState([]);
  useEffect(() => {
    UserInfo()
  }, [])

  const UserInfo = async () => {
    try {
      await axios.get('http://localhost:3000')
        .then((res) => {
          setData(res.data)
          console.log(res.data)
        })

    } catch (error) {
      console.error(error)
    }
  }
  const handelImg = (e) => {
    setImage(e.target.files[0])

  }
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const info = new FormData();
      info.append('name', name)
      info.append('image', image)
      await axios.post('http://localhost:3000/upload', info)
      setName("")
      setImage("")
      UserInfo()
    } catch (error) {
      setErr(err.message)
    }
  }
  const HandleDrop = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/${id}`)
      UserInfo()
    } catch (error) {
      console.error(error)
    }
  }





  return (
    <>
      <form onSubmit={HandleSubmit}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          type='text'
          placeholder='Enter Pic name'
          className='input input-bordered border-success' />
        <input
          onChange={handelImg}
          accept='image/*'
          type='file'
          className='file-input file-input-bordered file-input-secondary' />
        <button type='submit' className='btn btn-success'>Upload</button>
      </form>
      <div className='flex justify-center w-full h-screen flex-wrap gap-4'>
        {
          data &&data.map((el, i) => {
            return (
              <div key={i}>
                <h1>{el.name}</h1>
                <img src={el.avatar} className='w-[400px] h-[400px]'/>
                <button onClick={() => HandleDrop(el._id)} className='btn btn-warning'>Delete</button>
                <Link className='btn btn-accent' to={`/${el._id}`}>View</Link>

              </div>
            )
          })
        }

      </div>
    </>

  )
}

export default Card
