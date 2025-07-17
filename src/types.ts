export type WeatherDayType = {
    datetime: string
    datetimeEpoch: number
    tempmax: number
    tempmin: number
    conditions: string
    moonphase: number
    sunset: string
    sunrise: string
    temp: number
    icon: string
}

export type WeatherType = {
    days: WeatherDayType[]
}

export type countryType = {
    country: string
    cities: string[]
}

export type cityType = {
    country: string
    city: string
}