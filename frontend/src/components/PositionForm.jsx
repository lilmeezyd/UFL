import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPosition, reset } from "../features/positions/positionSlice"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"

function PositionForm() {

const [ data, setData ] = useState({
    pluralName: '',
    singularName: '',
    shortName: ''
    })
  
    const { pluralName, singularName, shortName } = data
    const { positions, isError, isLoading, message } = useSelector((state) => 
      state.positions
    ) 
    const dispatch = useDispatch()

    useEffect(() => {
      if(isError) {
        console.log(message)
        toast.error(message)
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
        const position = {
            pluralName,
            singularName,
            shortName
        }
        dispatch(createPosition(position))
        setData((prevState) => ({
          ...prevState,
          pluralName : '',
          singularName: '',
          shortName: ''
        }))
    }  
/*
    if(isLoading) {
      return <Spinner />
    } */
  return (
    <section className='form'>
        <form onSubmit={onSubmit}> 
          <div className="form-group">
            <input type="text" 
            id='pluralName' name='pluralName' value={pluralName}
             placeholder='Enter Plural Name'
            onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="text" 
            id='singularName' name='singularName' value={singularName}
             placeholder='Enter Singular Name'
            onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="text" 
            id='shortName' name='shortName' value={shortName} 
            placeholder='Enter Short Name'
            onChange={onChange} />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
  )
}

export default PositionForm