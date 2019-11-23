package com.travelmaker.alarm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.travelmaker.alarm.domain.AlarmDTO;
import com.travelmaker.alarm.service.AlarmServiceImpl;

@RestController
public class AlarmApiController {

	@Autowired
	private AlarmServiceImpl alarmServiceImpl;
	
	@GetMapping(value="alarm/load")
	public List<AlarmDTO> alarmLoad(@RequestParam String seq){
		
		List<AlarmDTO> list = alarmServiceImpl.getAlarmList(seq);
		for (AlarmDTO alarmDTO : list) {
			System.out.println(alarmDTO.toString());
		}
		
		return list;
	}
	
	
}
