import * as luxon from 'luxon';
import { Format } from '../constants/dateFormats';

export const toFormat = (date: Date, format: Format): string => {
    return luxon.DateTime.fromJSDate(date).toFormat(format);
};

export const getRelativeCalendar = (date: Date | string): string | null => {
    const dateTime = typeof date ==='string' ? luxon.DateTime.fromISO(date) : luxon.DateTime.fromJSDate(date);
    const now = luxon.DateTime.now();
    const diffToNow = now.diff(dateTime, ["years", "months", "days", "hours", "minutes", "seconds"]);
    const unit: luxon.ToRelativeUnit = diffToNow.years > 0 ? 'years'
        : diffToNow.months > 0 ? 'months'
            : diffToNow.days > 0 ? 'days'
                : diffToNow.minutes > 0 ? 'minutes'
                    : 'seconds';

    return dateTime.toRelativeCalendar({ unit })
}
