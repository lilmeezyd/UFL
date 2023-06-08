import TeamForm from "../components/TeamForm"
import TeamList from "../components/TeamList"
function Teams() {
  return (
    <>
    <section className='heading'>
      <h1>Team Section</h1></section>
      <div className="element-area">
        <TeamForm />
        <TeamList />
      </div>
      </> 
  )
}

export default Teams