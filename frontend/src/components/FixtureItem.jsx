import getTime from "../utils/getTime"
import getPm from "../utils/getPm"

function FixtureItem({fixture, teams}) {
  return (
    
    <>
    <div className="home">
        <p className="team">{teams.filter(team => team._id === fixture.teamHome)[0]?.name}</p>
        <p className={`${fixture?.stats?.length > 0 ? 'score' : 'time-1'}`}>{fixture?.stats?.length > 0 ?
            fixture?.stats?.filter(x => x.identifier === 'goalsScored')[0]
            .home.map(x => x.value).reduce((a, b) => a+b,0) + fixture?.stats?.filter(x => x.identifier === 'ownGoals')[0]
            .away.map(x => x.value).reduce((a, b) => a+b,0) : 
            getTime(new Date(fixture.kickOffTime).toLocaleTimeString('en-US'))}
        </p>
    </div>

    <div className="away">  
        <p className={`${fixture?.stats?.length > 0 ? 'score' : 'time-2'}`}>{fixture?.stats?.length > 0 ? 
            fixture?.stats?.filter(x => x.identifier === 'goalsScored')[0]
            .away.map(x => x.value).reduce((a, b) => a+b,0) + fixture?.stats?.filter(x => x.identifier === 'ownGoals')[0]
            .home.map(x => x.value).reduce((a, b) => a+b,0) : 
            getPm(new Date(fixture.kickOffTime).toLocaleTimeString('en-US'))
            }
        </p>
        <p className="team">{teams.filter(team => team._id === fixture.teamAway)[0]?.name}</p>
    </div>

</>
  )
}

export default FixtureItem