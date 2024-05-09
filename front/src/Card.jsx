
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
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
      <div >
        <form onSubmit={HandleSubmit} className='w-full h-min p-2 flex flex-wrap flex-col lg:flex-row  justify-center items-center gap-2'>
          <label className='input input-bordered border-success flex items-center gap-2'>
            Pic Name:
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              type='text'
              placeholder='Enter Pic name'
              className='' />
          </label>

          <input
            onChange={handelImg}
            accept='image/*'
            type='file'
            className='file-input file-input-bordered file-input-secondary' />
          <div>
            <button type='submit' className='btn btn-success'>Upload</button>
          </div>
        </form>
      </div>

      <div className='flex justify-center w-full h-screen flex-wrap gap-4'>
        {
          data && data.map((el, i) => {
            return (
              <div key={i} className='card'>
                <div className='card-body'>
                  <h1 className='card-title'>{el.name}</h1>
                  <img src={el.avatar} className='w-[400px] h-[400px]' />
                  <div className='card-actions justify-start'>
                

                  </div>
                  <div className='card-actions justify-end'>

                    <button onClick={() => HandleDrop(el._id)} className='btn btn-warning'>Delete</button>
                    <Link className='btn btn-accent' to={`/${el._id}`}>View</Link>
                  </div>
                </div>





              </div>
            )
          })
        }

      </div>
    </>

  )
}

export default Card
