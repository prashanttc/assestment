import { useNavigate } from 'react-router-dom'
import image from '../../public/get-notes.png'

const ShowError = () => {
  const navigate = useNavigate()
  const handleclick =()=>{
    navigate("/")
  }
  return (
    <div>
      <img src={image} className='w-full h-screen object-contain cursor-pointer ' alt="oye" onClick={handleclick}/>
    </div>
  )
}

export default ShowError
