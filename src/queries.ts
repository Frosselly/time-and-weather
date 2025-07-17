import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { countryType, WeatherType } from "./types"
import { useAtom } from "jotai"
import { selectedCityAtom } from "./atoms"

const fetchCities = async (): Promise<countryType[]> => {
    // await new Promise((res) => setTimeout(res, 5000))

    const respone = await axios.get('/cities.json')
    return respone.data.data
}

export const useCities = () => {
    return useQuery({
        queryKey: ['cities'],
        queryFn: fetchCities,
    })
}

const fetchWeatherData = async (city: string): Promise<WeatherType> => {
    // await new Promise((res) => setTimeout(res, 5000))
    const weatherApiKey = import.meta.env.VITE_WEATHER_KEY
    const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=uk&include=days&key=${weatherApiKey}&contentType=json`
    )
    return response.data
}

export const useWeather = () => {
    // return {
    //     data: undefined,
    //     isLoading: false,
    //     error: new Error('Test error - API failed'),
    //     isError: true
    // }
    const [selectedCity] = useAtom(selectedCityAtom)
    return useQuery({
        queryKey: ['weather', selectedCity],
        queryFn: () => fetchWeatherData(selectedCity.city),
    })
}