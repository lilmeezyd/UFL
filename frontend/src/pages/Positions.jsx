import PositionForm from "../components/PositionForm"
import PositionList from "../components/PositionList"
function Positions() {
  return (
    <>
    <section className='heading'>
      <h1>Position Section</h1></section>
      <div className="element-area">
        <PositionForm />
        <PositionList />
      </div>
      </> 
  )
}

export default Positions