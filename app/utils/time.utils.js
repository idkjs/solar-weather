import { DateTime } from 'luxon';

module.exports = {
	isDaylight(currentTimezone) {
		const eveningTime = DateTime.local()
			.set({ hour: 18, minute: 0, second: 0 })
			.setZone(currentTimezone);

		return DateTime.local().setZone(currentTimezone) < eveningTime;
	},

	setToTime(time, h, m, s) {
		time.set({ hour: h, minute: m, second: s });
	},
};
