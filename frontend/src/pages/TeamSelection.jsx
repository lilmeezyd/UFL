import FixtureList from '../components/FixtureList'
import Players from '../components/Players'

function TeamSelection() {
  return (
    <div className='team-selection'>
      <section>Squad</section>
      <Players />
      <FixtureList />
    </div>
  )
}

export default TeamSelection