import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import matchdayReducer from '../features/matchdays/matchdaySlice'
import positionReducer from '../features/positions/positionSlice'
import teamReducer from '../features/teams/teamSlice'
import playerReducer from '../features/players/playerSlice'
import fixtureReducer from '../features/fixtures/fixtureSlice'
import picksReducer from '../features/picks/picksSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        goals: goalReducer,
        matchdays: matchdayReducer,
        positions: positionReducer,
        teams: teamReducer,
        players: playerReducer,
        fixtures: fixtureReducer,
        managerPicks: picksReducer
    }
})