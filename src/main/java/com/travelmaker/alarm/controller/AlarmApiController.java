package com.travelmaker.alarm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.travelmaker.alarm.domain.AlarmDTO;
import com.travelmaker.alarm.service.AlarmService;
import com.travelmaker.purchase.domain.PurchaseRequestDTO;
import com.travelmaker.user.domain.UserDTO;
import com.travelmaker.user.service.UserService;
import com.travelmaker.user.service.UserServiceImpl;

@RestController
@RequestMapping("/alarm")
public class AlarmApiController {

	@Autowired
	private AlarmService alarmService;
	
	@Autowired
	private UserServiceImpl userServiceImpl;
	
	@GetMapping(value="/load")
	public List<AlarmDTO> alarmLoad(@RequestParam String seq){
		
		List<AlarmDTO> list = alarmService.getAlarmList(seq);
		for (AlarmDTO alarmDTO : list) {
			System.out.println(alarmDTO.toString());
		}
		
		return list;
	}
	@GetMapping(value = "/{header}/{ano}")
	public ModelAndView AlarmView(@PathVariable String header, @PathVariable String ano) {
		ModelAndView modelAndView = new ModelAndView();
		System.out.println("ano:"+ano);
		int fno = alarmService.alarmChange(Integer.parseInt(ano));
		System.out.println(fno);
		modelAndView.addObject("fno", fno);
		modelAndView.setViewName("jsonView");
		
		return modelAndView;
	}
	
	@GetMapping(value="/myalarmload", produces = "application/json")
	public List<AlarmDTO> myalarmload(@RequestParam String seq,@RequestParam String con){
		/* con : 1.전체알람,2.동행,3.대리구매,4.좋아요,5.댓글 */
		UserDTO userDTO = userServiceImpl.getUserDTO(Integer.parseInt(seq));
		List<AlarmDTO> list = alarmService.getMyAlarmList(userDTO.getId()+"%"+userDTO.getRegisterMethod(),con);
		
		return list;
	}
	
	@DeleteMapping(value="/deleteAlarm/{con}/{seq}/{alarmType}")
	public ResponseEntity<String> deleteAlarm(@PathVariable String con,@PathVariable String seq,@PathVariable String alarmType) {
		/* con : 1. 읽은 알람 지우기  */
		/* seq : userTable seq */
		/* alarmType : 알람종류  [1.전체 2.동행 3.구매 4.좋아요 5.댓글]*/
		
		UserDTO userDTO = userServiceImpl.getUserDTO(Integer.parseInt(seq));
		String requestFid = userDTO.getId()+"%"+userDTO.getRegisterMethod();
		
		
		if(con.equals("1")) { //읽은 알람 지우기
			alarmService.deleteNreadAlarm(requestFid,1,Integer.parseInt(alarmType));
		}else if(con.equals("2")) { // 모든 알람 지우기
			alarmService.deleteNreadAlarm(requestFid,2,Integer.parseInt(alarmType));
		}else {
			System.out.println("ERROR");
		}
		
		String responseMessage = alarmType;
		return new ResponseEntity<String>(responseMessage,HttpStatus.OK);
	}
}
