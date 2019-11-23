package com.travelmaker.alarm.dao;

import java.util.List;

import com.travelmaker.alarm.domain.AlarmDTO;

public interface AlarmDAO {

	public void addAlarm(AlarmDTO alarmDTO);

	public List<AlarmDTO> getAlarmList(String seq);

}
