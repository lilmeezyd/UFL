import React from 'react'
import { Link } from 'react-router-dom'

function DashboardHeader() {
  return (
    <>
            <li>
                <Link to='/dashboard'>Home</Link>
            </li>
            <li>
                <Link to='/dashboard/teams'>Teams</Link>
            </li>
            <li>
                <Link to='/dashboard/players'>Players</Link>
            </li>
            <li>
                <Link to='/dashboard/matchdays'>Matchdays</Link>
            </li>
            <li>
                <Link to='/dashboard/positions'>Positions</Link>
            </li>
            <li>
                <Link to='/dashboard/fixtures'>Fixtures</Link>
            </li>
    </>
  )
}

export default DashboardHeader