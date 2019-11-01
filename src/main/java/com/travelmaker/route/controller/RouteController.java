package com.travelmaker.route.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.travelmaker.route.domain.RouteContentDTO;
import com.travelmaker.route.domain.RouteDTO;
import com.travelmaker.route.service.RouteService;

@RequestMapping(value = "/route")
@Controller
public class RouteController {

	@Autowired
	RouteService routeService;
	
	@RequestMapping(value = "routeList")
	public String routeList(Model model) {
		// dto 리스트를 서버DB에서 가져오기
		return "/route/routeList";
	}

	@RequestMapping(value = "routeWriteForm")
	public String routeWirteForm(Model model) {
		// dto를 서버DB에 저장
		return "/route/routeWriteForm";
	}

	@RequestMapping(value = "domesticWriteForm")
	@ResponseBody
	public Map<String, Object> domesticWriteForm(Model model,
			@ModelAttribute RouteDTO routeDTO) {
				
		routeService.setRouteStep1(routeDTO);
		// ajax로 리턴해서 자바스크립트에서 양식 뿌려주기
		return null;
	}

	@RequestMapping(value = "overseaWriteForm")
	@ResponseBody
	public Map<String, Object> overseaWriteForm(Model model,
			@ModelAttribute RouteDTO routeDTO) {
		
		routeService.setRouteStep1(routeDTO);
		// ajax로 리턴해서 자바스크립트에서 양식 뿌려주기
		return null;
	}
	
	@RequestMapping(value = "saveCourse")
	@ResponseBody
	public Map<String, Object> saveCourse(Model model,
			@ModelAttribute RouteContentDTO routeContentDTO) {
		System.out.println(routeContentDTO.getDateStart());
		routeService.saveCourse(routeContentDTO);
		// ajax로 리턴해서 자바스크립트에서 양식 뿌려주기
		return null;
	}

}
