import PlayerForm from "../components/PlayerForm"
import PlayerList from "../components/PlayerList"
function Players() {
  return (
    <>
    <section className='heading'>
      <h1>Player Section</h1></section>
      <div className="element-area">
        <PlayerForm />
        <PlayerList />
      </div>
      </> 
  )
}

export default Players