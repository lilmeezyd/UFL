import { useState, useEffect } from 'react'
import TransferHeader from '../components/TransferHeader'
import FixtureList from '../components/FixtureList'
import { getPlayers, reset } from '../features/players/playerSlice'
import { getTeams } from '../features/teams/teamSlice'
import { useDispatch, useSelector } from 'react-redux'
import SelectionBody from '../components/SelectionBody'

function TeamSelection({ managerPicks, showPop, handleClose, handleShow }) {
  const [width, setWidth] = useState(window.innerWidth)
  const [list, setList] = useState(false)
  const dispatch = useDispatch()
  const { players } = useSelector((state) => state.players)
  const { teams } = useSelector(state => state.teams)

  const onResize = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    dispatch(getPlayers())
    dispatch(getTeams())
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

  const goalSlots = [{
    slot: 1, used: false,
    IsCaptain: false,
    IsViceCaptain: true,
    multiplier: 1
  }, {
    slot: 12, used: false,
    IsCaptain: false,
    IsViceCaptain: false,
    multiplier: 0
  }]
  const defSlots = [{
    slot: 2, used: false,
    IsCaptain: true,
    IsViceCaptain: false,
    multiplier: 2
  }, {
    slot: 3, used: false,
    IsCaptain: false,
    IsViceCaptain: false,
    multiplier: 1
  }, {
    slot: 4, used: false, IsCaptain: false,
    IsViceCaptain: false,
    multiplier: 1
  }
    , {
      slot: 5, used: false, IsCaptain: false,
    IsViceCaptain: false,
    multiplier: 1
  }, {
    slot: 13, used: false, IsCaptain: false,
    IsViceCaptain: false,
    multiplier: 0
  }]
  const midSlots = [{
    slot: 6, used: false, IsCaptain: false,
    IsViceCaptain: false,
    multiplier: 1
  }, {
    slot: 7, used: false, IsCaptain: false,
    IsViceCaptain: false,
    multiplier: 1
  }, {
    slot: 8, used: false, IsCaptain: false,
    IsViceCaptain: false,
    multiplier: 1
  }
    , {
      slot: 9, used: false, IsCaptain: false,
    IsViceCaptain: false,
    multiplier: 1
  }, {
    slot: 14, used: false, IsCaptain: false,
    IsViceCaptain: false,
    multiplier: 0
  }]
  const fwdSlots = [{
    slot: 10, used: false, IsCaptain: false,
    IsViceCaptain: false,
    multiplier: 1
  }, {
    slot: 11, used: false, IsCaptain: false,
    IsViceCaptain: false,
    multiplier: 1
  }, {
    slot: 15, used: false, IsCaptain: false,
    IsViceCaptain: false,
    multiplier: 0
  }]


  return (
    <>
      <TransferHeader title={`Team Selection`} toggleList={toggleList} list={list} />
      <div className='team-selection'>
        <SelectionBody
          picks={[]}
          list={list}
          width={width}
          teams={teams}
          goalSlot={goalSlots} defSlot={defSlots} midSlot={midSlots} fwdSlot={fwdSlots}
          toggleList={toggleList} handleShow={handleShow}
          handleClose={handleClose} players={players} showPop={showPop} />
        <FixtureList />
      </div>
    </>
  )
}

export default TeamSelection