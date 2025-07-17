import moment from 'moment-timezone'
import { useAtomValue } from 'jotai'
import { timezoneAtom } from '../atoms'
import { useMemo } from 'react'
import { useWeather } from '../queries'

function ExtraTimeInfo() {
    const { data: weatherData, isLoading, error } = useWeather()
    const timezone = useAtomValue(timezoneAtom)

    const timeOffFormatted = useMemo(() => {
        const timeOff = moment.tz(timezone).format('Z')
        return `UTC/GMT ${timeOff}`
    }, [timezone])

    // const targetTimezone = 'America/Los_Angeles'
    const diff = useMemo(() => {
        const now = moment().utcOffset()
        const targetTime = moment.tz(timezone).utcOffset()

        return (now - targetTime) / 60
    }, [timezone])

    // if (isLoading) {
    //     return <div className="size-18 bg-amber-600 m-4">Loading extra...</div>
    // }

    // if (error) {
    //     return <div className="size-18 bg-red-600 m-4">Error loading weather</div>
    // }

    // if (!weatherData || !weatherData.days) {
    //     return <div className="size-18 bg-gray-600 m-4">No weather data</div>
    // }

    const currentDayWeather = weatherData?.days[0]

    return (
        <div className=" h-50 p-4 flex justify-between">
            <div className="flex flex-col gap-4">
                <div>
                    <div>Time zone</div>
                    <div className="text-xl font-bold">{timeOffFormatted}</div>
                    {/*UTC/GMT +3 hours */}
                </div>
                <div>
                    <div>Difference</div>
                    <div className="text-xl font-bold">
                        {Math.abs(diff)} hours {diff > 0 ? 'behind' : 'ahead'}
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                <div className="bg-black/30 flex flex-col items-center justify-center h-full w-28">
                    <div>Sunrise</div>
                    {isLoading ? (
                        <div className="size-18 bg-amber-600 m-4">Loading extra...</div>
                    ) : error || !currentDayWeather ? (
                        <div className="size-18 bg-red-600 m-4">Error loading weather</div>
                    ) : (
                        <div className="text-lg font-bold">
                            {currentDayWeather.sunrise.slice(0, -3)}
                        </div>
                    )}
                </div>
                <div className="bg-black/30 flex flex-col items-center justify-center h-full w-28">
                    <div>Sunset</div>

                    {isLoading ? (
                        <div className="size-18 bg-amber-600 m-4">Loading extra...</div>
                    ) : error || !currentDayWeather ? (
                        <div className="size-18 bg-red-600 m-4">Error loading weather</div>
                    ) : (
                        <div className="text-lg font-bold">
                            {currentDayWeather.sunset.slice(0, -3)}
                        </div>
                    )}
                </div>
                <div className="bg-black/30 flex flex-col items-center justify-center h-full w-28">
                    <div>Day length</div>
                    <div className="text-lg font-bold">{'16.69'}h</div>
                </div>
                <div className="bg-black/30 flex flex-col items-center justify-center h-full w-28">
                    <div>Moon</div>
                    {isLoading ? (
                        <div className="size-18 bg-amber-600 m-4">Loading extra...</div>
                    ) : error || !currentDayWeather ? (
                        <div className="size-18 bg-red-600 m-4">Error loading weather</div>
                    ) : (
                        <div className="text-lg font-bold">
                            {currentDayWeather.moonphase * 100} %
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ExtraTimeInfo
