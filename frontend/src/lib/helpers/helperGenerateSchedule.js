/**
 * The function `helperGenerateSchedule` generates a schedule with time intervals of 30 minutes in AM
 * and PM format for a 24-hour period.
 * @param [interval=30] - The `interval` parameter in the `helperGenerateSchedule` function represents
 * the time interval in minutes between each entry in the schedule. By default, if no value is provided
 * for `interval`, it is set to 30 minutes. This means that the schedule will generate time slots at
 * 30-minute intervals
 * @returns The helperGenerateSchedule function returns an array of time slots in 30-minute intervals
 * covering a 24-hour period. Each time slot is formatted as "HH:MM AM/PM".
 */
export const helperGenerateSchedule = (interval = 30) => {
	const schedule = [];
	const type = ['AM', 'PM'];

	for (let i = 0; i < 24; i++) {
		const hr = i % 12 === 0 ? 12 : i % 12;
		const meridian = type[Math.floor(i / 12)];

		for (let min = 0; min < 60; min += interval) {
			const hour = hr.toString().padStart(2, '0');
			const minutes = min.toString().padStart(2, '0');

			schedule.push(`${hour}:${minutes} ${meridian}`);
		}
	}

	return schedule;
};
