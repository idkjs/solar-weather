open MomentRe;

[@bs.raw "require('moment-timezone)"];

[@bs.send] external tz : (Moment.t, string) => Moment.t = "tz";

let convertToTimeZone = (time, timezone) => tz(moment(time), timezone);

let convertUnixToTimezone = (time, timezone) =>
  tz(momentWithUnix(time), timezone);

let convertToTimeZoneAndString = (time, timezone, format) : string =>
  convertUnixToTimezone(time, timezone) |> Moment.format(format);

let convertToString = (format: string) => Moment.format(format);

let isAfterCurrent = (time: int) =>
  Moment.isAfter(momentWithUnix(time), momentNow());

let setToStartOf =
    (
      start: [
        | `day
        | `hour
        | `millisecond
        | `minute
        | `month
        | `quarter
        | `second
        | `week
        | `year
      ]
    ) =>
  Moment.startOf(start);
