import PlayerCard from './PlayerCard'

function PositionElement({ playerPicks, showPop, handleShow, handleClose, fieldPosition, teams, positions, sort, id, onClick }) {
  return (
    <>
      {fieldPosition.length > 0 ? (
        <div className="table-one" id={id}>
          <div className="player-header">
            <div className="info"></div>
            <div className="position-table">{id[0].toUpperCase() + id.slice(1)}</div>
            <div className="money">Ugx</div>
            <div className="others">Points</div>
          </div>
          <div>
            {fieldPosition.length > 0 && positions.length > 0 &&
            teams.length > 0 && fieldPosition.map((onePlayer) => {
              let teamObj = teams.find((x) => x._id === onePlayer.playerTeam);
              //let news = onePlayer.chance_of_playing_next_round;
              let shortName = teamObj.shortName;
              let positionObj = positions?.find(
                (x) => x._id === onePlayer.playerPosition
              );
              let shortPos = positionObj?.shortName;
              let forwardImage =
                positionObj?._id === '648a4408ae0e41bee2304c9a'
                  ? `${teamObj.code}_1-66`
                  : `${teamObj.code}-66`;
              /* let backgroundColor =
                 news === 0
                   ? "darkred"
                   : news === 25
                   ? "darkorange"
                   : news === 50
                   ? "orange"
                   : news === 75
                   ? "yellow"
                   : "white";
               let color =
                 news === 0
                   ? "white"
                   : news === 25
                   ? "white"
                   : news === 50
                   ? "white"
                   : "black";*/
              return (
              <PlayerCard
                  key={onePlayer._id}
                  //backgroundColor={backgroundColor}
                  //color={color}
                  playerPicks={playerPicks}
                  onClick={onClick}
                  forwardImage={forwardImage}
                  playerPos={onePlayer}
                  shortName={shortName}
                  shortPos={shortPos}
                  position={positionObj._id}
                  team={teamObj._id}
                  sort={sort}
                  handleShow={handleShow}
                  handleClose={handleClose}
                  showPop1={showPop}
                ></PlayerCard>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  )
}

export default PositionElement