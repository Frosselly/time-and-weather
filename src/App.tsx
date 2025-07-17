import './App.css'
import Header from './components/Header'
import ExtraTimeInfo from './components/ExtraTimeInfo'
import WeatherTime from './components/WeatherTime'
import type { cityType } from './types'
import { useAtom, useSetAtom } from 'jotai'
import { selectedCityAtom, timezoneAtom } from './atoms'
import { findFromCityStateProvince } from 'city-timezones'
import { useEffect } from 'react'

function App() {
    const setTimezone = useSetAtom(timezoneAtom)
    const [selectedCity, setSelectedCity] = useAtom(selectedCityAtom)

    useEffect(() => {
        onCityClick(selectedCity)
    }, [])

    const onCityClick = async (cityData: cityType) => {
        // const tz = allTimezones.filter((tz) => tz.toLowerCase().includes(capital.toLowerCase()))
        const tz = findFromCityStateProvince(`${cityData.city} ${cityData.country}`)
        if (tz.length) {
            setTimezone(tz[0].timezone)
            setSelectedCity(cityData)
        }
    }

    return (
        <div className="w-200 m-auto mt-10">
            <Header onCityClick={onCityClick} />
            <WeatherTime />
            <ExtraTimeInfo />
        </div>
    )
}

export default App
