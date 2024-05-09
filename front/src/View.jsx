import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
function View() {

  const { id } = useParams()
  const [values, setValues] = useState({
    _id: id,
    name: "",
    avatar: ""
  })
  const [img, SetImg] = useState("")
  const getOneuser = `http://localhost:3000/${id}`
  const api = `http://localhost:3000/${id}`;
  useEffect(() => {
    UpdateInfo()
  }, [])
  const UpdateInfo = async () => {
    await axios.get(getOneuser)
      .then((res) => {
        console.log(res.data)
        setValues({
          ...values,
          name: res.data.name,
          avatar: res.data.avatar
        })
      })
  }
  const HandleChange = (e) => {
    const file = e.target.files[0];
    SetImg(file)

  }
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData()
      formData.append('name', values.name)
      if (img) {
        formData.append('image', img)
      }
      const res = await axios.put(api, formData)
      console.log(res)

      setValues({
        ...values,
        avatar: res.data.avatar,
        name: res.data.name
      })
      SetImg('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='w-full flex flex-col items-center h-screen justify-center'>


        <form onSubmit={HandleSubmit} className='w-full h-min p-2 flex flex-wrap flex-col lg:flex-row  justify-center items-center gap-2'>
          <label className='input input-bordered flex items-center gap-2 w-[300px]'>
            <p className='text-lg text-slate-400 font-semibold'>Name:</p>
            <input
              type='text'
              className='text-lg text-purple-500'
              value={values.name} onChange={e => setValues({ ...values, name: e.target.value })} />
          </label>

          <input
            className='file-input file-input-bordered '
            type='file'
            accept='image/*'
            onChange={HandleChange}
          />
          <button className='btn btn-info' type='submit'>Change</button>
        </form>


        {
          <div className='w-[450px] h-[450px] flex justify-center items-center rounded-lg shadow-lg lg:hover:shadow-2xl bg-slate-400'>
            <img src={values.avatar} alt={values.name} className='w-[400px] h-[400px] ' />

          </div>
        }
      </div>

    </>
  )
}

export default View
