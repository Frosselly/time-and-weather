import Time from './Time'
import WeatherCard from './WeatherCard'
import { useWeather } from '../queries'

function WeatherTime() {
    const { data: weatherData, isLoading, error } = useWeather()

    if (isLoading) {
        return <div className="size-18 bg-amber-600 m-4">Loading...</div>
    }

    if (error) {
        return (
            <div className="p-4">
                <Time />
                <div className="size-18 bg-red-600 my-4">Error loading weather</div>
            </div>
        )
    }

    if (!weatherData || !weatherData.days || weatherData.days.length === 0) {
        return <div className="size-18 bg-gray-600 m-4">No weather data</div>
    }

    const currentDayWeather = weatherData.days[0]

    return (
        <div className="h-50 p-4 flex justify-between">
            <div className="flex flex-col gap-4">
                <Time />
                <div className="flex gap-5">
                    <div>
                        <div className="text-xl font-bold">{currentDayWeather.temp} °C</div>
                        <div className="text-sm">{currentDayWeather.conditions}</div>
                        <div className="text-sm">
                            {currentDayWeather.tempmax}/{currentDayWeather.tempmin} °C
                        </div>
                    </div>
                    <div className="size-18 bg-amber-600">{currentDayWeather.icon}</div>
                </div>
            </div>

            <div className="flex gap-2">
                {[1, 2, 3].map((number) => (
                    <WeatherCard key={number} weatherData={weatherData?.days[number]} />
                ))}
            </div>
        </div>
    )
}

export default WeatherTime
