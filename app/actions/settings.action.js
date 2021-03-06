import { DateTime } from 'luxon';

import * as types from '../../lib/js/app/actions/actions';
import realm from '../realm';
import * as creators from '../../lib/js/app/actions/creators';

export function setTimeType(timeType, index) {
	realm.write(() => {
		realm.create('Options', { key: 1, timeType, timeIndex: index }, true);
	});
	return dispatch => {
		dispatch(creators.updateTime(timeType, index));
	};
}

export function setUnit(unit, index) {
	realm.write(() => {
		realm.create(
			'Options',
			{
				key: 1,
				unit,
				unitIndex: index,
			},
			true,
		);
	});

	return dispatch => {
		dispatch({
			type: types.setUnit,
			unit,
			unitIndex: index,
		});
	};
}

export function setLatestCollectiveUpdate() {
	const date = DateTime.local().valueOf();
	realm.write(() => {
		realm.create(
			'Options',
			{
				key: 1,
				latestUpdate: date,
			},
			true,
		);
	});

	return dispatch => {
		dispatch({
			type: types.updateLatestTimestamp,
			timestamp: date,
		});
	};
}

export function setOnboarding(value) {
	realm.write(() => {
		realm.create(
			'Options',
			{
				key: 1,
				onboarding: value,
			},
			true,
		);
	});

	return dispatch => {
		dispatch({
			type: types.setOnboarding,
			value,
		});
	};
}

export function getSettings() {
	const settings = realm.objects('Options').slice(0, 1)[0];
	const unit = settings ? settings.unit : 'c';
	const unitIndex = settings ? settings.unitIndex : 0;
	const timeType = settings ? settings.timeType : '24';
	const timeIndex = settings ? settings.timeIndex : 0;
	const locationIndex = settings ? settings.locationIndex : 0;
	const onboarding = settings ? settings.onboarding : false;
	const latestUpdate = settings
		? settings.latestUpdate
		: DateTime.local()
			.minus({ days: 1 })
			.valueOf();
	if (!settings) {
		realm.write(() => {
			realm.create('Options', {
				unit: 'c',
				unitIndex: 0,
				timeType: '24',
				timeIndex: 0,
				key: 1,
				latestUpdate,
			});
		});
	}
	return async dispatch => {
		await dispatch({
			type: types.setSettings,
			unit,
			unitIndex,
			timeType,
			timeIndex,
			locationIndex,
			onboarding,
			latestUpdate,
		});
	};
}
