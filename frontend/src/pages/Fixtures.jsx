import FixtureForm from "../components/FixtureForm"
import FixtureList from "../components/FixtureList"
import EditFixture from "../components/EditFixture"
import { useState } from "react"
function Fixtures({ handleClose, handleShow }) {

  const [edit, setEdit] = useState(false)
  const [editStats, setEditStats] = useState(false)
  const [fixtureId, setFixtureId] = useState('')

  const onEdit = (id) => {
    setEdit(true)
    setEditStats(false)
    setFixtureId(id)
  }

  const onStats = (id) => {
    setEdit(false)
    setEditStats(true)
    setFixtureId(id)
  }

  const clearEdit = () => {
    setEdit(false)
    setEditStats(false)
    setFixtureId('')
  }

  return (
    (edit ?
      <EditFixture fixtureId={fixtureId} clearEdit={clearEdit}
        handleShow={handleShow}
        handleClose={handleClose} /> : <>
        <section className='heading'>
          <h1>Fixture Section</h1></section>
        <div className="element-area">
          <FixtureForm />
          <FixtureList onEdit={onEdit} onStats={onStats} handleShow={handleShow}
            handleClose={handleClose} />
        </div>
      </>)
  )
}

export default Fixtures