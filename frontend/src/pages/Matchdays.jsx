import MatchdayForm from "../components/MatchdayForm"
import MatchdayList from "../components/MatchdayList"
function Matchdays() {
  return (
    <>
    <section className='heading'>
      <h1>Matchday Section</h1></section>
      <div className="element-area">
        <MatchdayForm />
        <MatchdayList />
      </div>
      </> 
  )
}

export default Matchdays