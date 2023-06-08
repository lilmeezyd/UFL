import FixtureForm from "../components/FixtureForm"
import FixtureList from "../components/FixtureList"
function Fixtures() {
  return (
    <>
    <section className='heading'>
      <h1>Fixture Section</h1></section>
      <div className="element-area">
        <FixtureForm />
        <FixtureList />
      </div>
      </> 
  )
}

export default Fixtures