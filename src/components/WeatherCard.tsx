import type { WeatherDayType } from '../types'
import moment from 'moment'

type WeatherCardType = {
    weatherData: WeatherDayType
}

function WeatherCard({ weatherData }: WeatherCardType) {
    const dateFormated = moment.unix(weatherData.datetimeEpoch).format('ddd Do')
    return (
        <div className="bg-black/30 flex flex-col items-center justify-center h-full w-32">
            <div className="size-18 bg-amber-600 m-1">{weatherData.icon}</div>
            <div className="text-lg font-bold">{weatherData.temp} °C</div>
            <div>{dateFormated}</div> {/* Wed 16 */}
        </div>
    )
}

export default WeatherCard
