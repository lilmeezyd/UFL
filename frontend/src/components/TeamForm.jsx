import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createTeam, reset } from "../features/teams/teamSlice"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"

function TeamForm() {

const [ data, setData ] = useState({
    name: '',
    code: '',
    shortName: ''
    })
  
    const { name, code, shortName } = data
    const { isError, isLoading, message } = useSelector((state) => 
      state.teams
    ) 
    const dispatch = useDispatch()

    useEffect(() => {
      if(isError) {
        toast.error(message)
      }

      return () => {
        dispatch(reset())
      }

    }, [isError, message, dispatch])

    const onChange = (e) => {
        setData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }))
      }
    
    const onSubmit = (e) => {
        e.preventDefault()
        const team = {
            name,
            code,
            shortName
        }
        dispatch(createTeam(team))
        setData((prevState) => ({
          ...prevState,
          name : '',
          code: '',
          shortName: ''
        }))
    }  

    if(isLoading) {
      return <Spinner />
    }
  return (
    <section className='form'>
        <form onSubmit={onSubmit}> 
          <div className="form-group">
            <input type="text" 
            id='name' name='name' value={name}
             placeholder='Enter Team Name'
            onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="text" 
            id='shortName' name='shortName' value={shortName} 
            placeholder='Enter Short Name'
            onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="number" 
            id='code' name='code' value={code}
             placeholder='Enter Code'
            onChange={onChange} />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
  )
}

export default TeamForm