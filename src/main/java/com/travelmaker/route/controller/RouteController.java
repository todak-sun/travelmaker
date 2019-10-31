package com.travelmaker.route.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(value = "/route")
@Controller
public class RouteController {

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
	public Map<String, Object> domesticWriteForm(Model model) {

		// ajax로 리턴해서 자바스크립트에서 양식 뿌려주기
		return null;
	}

	@RequestMapping(value = "overseaWriteForm")
	public Map<String, Object> overseaWriteForm(Model model) {

		// ajax로 리턴해서 자바스크립트에서 양식 뿌려주기
		return null;
	}

}
