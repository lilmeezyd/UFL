import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createMatchday, reset } from "../features/matchdays/matchdaySlice"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
function MatchdayForm() {

    const [ data, setData ] = useState({
        name: '',
        deadlineTime: ''
      }) 
    
      const { name, deadlineTime } = data
      const dispatch = useDispatch()
      const { isLoading, isError, message } = useSelector(
        (state) => state.matchdays)
    
      useEffect(() => {
        if(isError) {
          toast.error(message)
        }
        dispatch(reset())
      },[dispatch, isError, message])
    
      const onChange = (e) => {
        setData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }))
      }
    
      const onSubmit = (e) => {
        e.preventDefault()
        const matchdayData = {
          name, deadlineTime
        }
        dispatch(createMatchday(matchdayData))
      }
    
      if(isLoading) {
        return <Spinner />
      }
  return (
    <section className='form'>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" id='name' name='name' value={name} placeholder='Enter Matchday'
            onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="datetime-local" id='deadlineDate' name='deadlineTime' value={deadlineTime}
            onChange={onChange} />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
  )
}

export default MatchdayForm