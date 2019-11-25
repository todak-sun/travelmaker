package com.travelmaker.alarm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.travelmaker.alarm.domain.AlarmDTO;
import com.travelmaker.alarm.service.AlarmService;
import com.travelmaker.alarm.service.AlarmServiceImpl;

@RestController
@RequestMapping("/alarm")
public class AlarmApiController {

	@Autowired
	private AlarmService alarmService;
	
	@GetMapping(value="/load")
	public List<AlarmDTO> alarmLoad(@RequestParam String seq){
		
		List<AlarmDTO> list = alarmService.getAlarmList(seq);
		for (AlarmDTO alarmDTO : list) {
			System.out.println(alarmDTO.toString());
		}
		
		return list;
	}
	@GetMapping(value = "/{header}/{ano}")
	public ModelAndView AlarmView(@PathVariable String header, @PathVariable int ano) {
		ModelAndView modelAndView = new ModelAndView();
		int fno = alarmService.alarmChange(ano);
		
		modelAndView.addObject("fno", fno);
		modelAndView.setViewName("jsonView");
		
		return modelAndView;
	}
	
}
