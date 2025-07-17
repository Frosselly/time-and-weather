import { useEffect, useState } from 'react'
import type { cityType } from '../types'
import { useCities } from '../queries'
import { useAtomValue } from 'jotai'
import { selectedCityAtom } from '../atoms'

type HeaderType = {
    onCityClick: (cityData: cityType) => void
}

function Header({ onCityClick }: HeaderType) {
    const selectedCity = useAtomValue(selectedCityAtom)
    const [search, setSearch] = useState('')
    const [cities, setCities] = useState<any[]>()
    const { data: allCities, isLoading, error } = useCities()

    const onSearchSubmit = (cityData: cityType | undefined) => {
        if (!cityData) {
            return
        }
        setSearch('')
        setCities([])
        onCityClick(cityData)
    }

    useEffect(() => {
        if (!allCities) return
        if (!search) {
            setCities([])
            return
        }
        const lowerSearch = search.toLowerCase()
        const filteredResults = allCities.flatMap((country) => {
            country.cities
                .filter((city) => city.toLowerCase().includes(lowerSearch))
                .map((filteredCity) => ({
                    country: country.country,
                    city: filteredCity,
                }))
        })
        setCities(filteredResults)
    }, [search])

    return (
        <div className="flex justify-between p-2">
            <div className="underline">
                {selectedCity.city}, {selectedCity.country}
            </div>
            <div className="flex justify-center">
                <input
                    className="w-40 h-5 bg-white border-1 outline-none disabled:bg-gray-300"
                    type="text"
                    onChange={(e) => setSearch(e.target.value ?? '')}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && cities?.[0]) {
                            onSearchSubmit(cities[0])
                        }
                    }}
                    disabled={isLoading || !!error}
                    placeholder={
                        isLoading ? 'Loading cities...' : error ? 'Failed city load' : 'Input city'
                    }
                />
                <button
                    className="size-5 bg-amber-950 hover:bg-amber-600"
                    onClick={() => {
                        alert("Doesn't work sry. :(")
                    }}
                ></button>
                <div className="w-45 mt-5 absolute ">
                    {cities?.slice(0, 10).map((cityData: cityType, index) => {
                        return (
                            <div
                                key={cityData.city + cityData.country + index}
                                className="p-0.5 w-full border-1 bg-white hover:bg-gray-500 select-none wrap-break-word"
                                onClick={() => onSearchSubmit(cityData)}
                            >
                                {cityData.city}, {cityData.country}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Header
