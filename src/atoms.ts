import { atom } from "jotai";
import moment from "moment-timezone";

export const timezoneAtom = atom(moment.tz.guess())
export const selectedCityAtom = atom({
    country: 'France',
    city: 'Paris',
})