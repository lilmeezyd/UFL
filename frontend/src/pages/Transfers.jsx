import { useState, useEffect } from 'react'
import TransferHeader from '../components/TransferHeader'
import TransferBody from '../components/TransferBody'
import FixtureList from '../components/FixtureList'
import { useDispatch, useSelector } from 'react-redux'
import { getPlayers, reset } from '../features/players/playerSlice'
import { getTeams } from '../features/teams/teamSlice'
import { getPicks } from '../features/picks/picksSlice'
import { getPositions } from '../features/positions/positionSlice'

function Transfers({ showPop, handleShow, handleClose }) {

  const [list, setList] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const dispatch = useDispatch()
  const { players } = useSelector((state) => state.players)
  const { teams } = useSelector(state => state.teams)
  const { managerPicks } = useSelector(state => state.managerPicks)
  const { positions } = useSelector(state => state.positions)

  const onResize = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    dispatch(getPicks())
    dispatch(getPlayers())
    dispatch(getTeams())
    dispatch(getPositions())
    window.addEventListener('resize', onResize)

    return () => {
      dispatch(reset())
      window.addEventListener('resize', onResize)
    }
  }, [dispatch])

  const toggleList = () => {
    setList(prevState => !prevState)
    setWidth(window.innerWidth)
  }

  const goalSlots = managerPicks?.picks?.filter(x => x.playerPosition === '648a4408ae0e41bee2304c9a')
    .map(x => x.position)
    .map((x, key) => x = {
      slot: x, used: true,
      IsCaptain: managerPicks?.picks?.filter(y => y.playerPosition === '648a4408ae0e41bee2304c9a')?.filter(z => z.position === x)[0]?.IsCaptain,
      IsViceCaptain: managerPicks?.picks?.filter(y => y.playerPosition === '648a4408ae0e41bee2304c9a')?.filter(z => z.position === x)[0]?.IsViceCaptain,
      multiplier: managerPicks?.picks?.filter(y => y.playerPosition === '648a4408ae0e41bee2304c9a')?.filter(z => z.position === x)[0]?.multiplier
    })

  const defSlots = managerPicks?.picks?.filter(x => x.playerPosition === '647faf277bb2ccc06e8bb00d')
    .map(x => x.position).map((x, key) => x = {
      slot: x, used: true,
      IsCaptain: managerPicks?.picks?.filter(y => y.playerPosition === '647faf277bb2ccc06e8bb00d')?.filter(z => z.position === x)[0]?.IsCaptain,
      IsViceCaptain: managerPicks?.picks?.filter(y => y.playerPosition === '647faf277bb2ccc06e8bb00d')?.filter(z => z.position === x)[0]?.IsViceCaptain,
      multiplier: managerPicks?.picks?.filter(y => y.playerPosition === '647faf277bb2ccc06e8bb00d')?.filter(z => z.position === x)[0]?.multiplier
    })

  const midSlots = managerPicks?.picks?.filter(x => x.playerPosition === '647faf357bb2ccc06e8bb010')
    .map(x => x.position).map((x, key) => x = {
      slot: x, used: true,
      IsCaptain: managerPicks?.picks?.filter(y => y.playerPosition === '647faf357bb2ccc06e8bb010')?.filter(z => z.position === x)[0]?.IsCaptain,
      IsViceCaptain: managerPicks?.picks?.filter(y => y.playerPosition === '647faf357bb2ccc06e8bb010')?.filter(z => z.position === x)[0]?.IsViceCaptain,
      multiplier: managerPicks?.picks?.filter(y => y.playerPosition === '647faf357bb2ccc06e8bb010')?.filter(z => z.position === x)[0]?.multiplier
    })

  const fwdSlots = managerPicks?.picks?.filter(x => x.playerPosition === '64807d367bb2ccc06e8bb051')
    .map(x => x.position).map((x, key) => x = {
      slot: x, used: true,
      IsCaptain: managerPicks?.picks?.filter(y => y.playerPosition === '64807d367bb2ccc06e8bb051')?.filter(z => z.position === x)[0]?.IsCaptain,
      IsViceCaptain: managerPicks?.picks?.filter(y => y.playerPosition === '64807d367bb2ccc06e8bb051')?.filter(z => z.position === x)[0]?.IsViceCaptain,
      multiplier: managerPicks?.picks?.filter(y => y.playerPosition === '64807d367bb2ccc06e8bb051')?.filter(z => z.position === x)[0]?.multiplier
    })


  return (
    <>
      <TransferHeader toggleList={toggleList} list={list} />
      <div className='team-selection'>
        {Object.keys(managerPicks).length > 0 && <TransferBody
          picks={managerPicks?.picks}
          list={list}
          width={width}
          teams={teams}
          positions={positions}
          goalSlot={goalSlots} defSlot={defSlots} midSlot={midSlots} fwdSlot={fwdSlots}
          toggleList={toggleList} handleShow={handleShow}
          handleClose={handleClose} players={players} showPop={showPop} />}
        <FixtureList />
      </div>
    </>
  )
}

export default Transfers