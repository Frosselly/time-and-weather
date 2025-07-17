import { useAtomValue } from 'jotai'
import moment from 'moment-timezone'
import { useEffect, useState } from 'react'
import { timezoneAtom } from '../atoms'

function Time() {
    const timezone = useAtomValue(timezoneAtom)
    const [time, setTime] = useState(moment.tz(timezone).format('HH:mm:ss'))
    const date = moment().format('dddd Do MMMM YYYY')

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(moment.tz(timezone).format('HH:mm:ss'))
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [])
    return (
        <div>
            <div className="text-2xl font-bold">{time}</div>
            <div className="text-sm">{date}</div> {/*Tuesday, 16 July 2025 */}
        </div>
    )
}

export default Time
