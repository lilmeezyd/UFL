import FixtureList from '../components/FixtureList'
import Players from '../components/Players'

function TeamSelection() {
  return (
    <div className='team-selection'>
      <section className='squad'>
        <div className="goal-select">
        </div>
        <div className="defend-select">
        </div>
        <div className="midfield-select">
        </div>
        <div className="forward-select">
        <div>
            <img src={require(`../static/default.png`)} alt="default" />
          </div>
          <div>
            <img src={require(`../static/default.png`)} alt="default" />
          </div>
          <div>
            <img src={require(`../static/default.png`)} alt="default" />
          </div>
        </div>
      </section>
      <Players />
      <FixtureList />
    </div>
  )
}

export default TeamSelection