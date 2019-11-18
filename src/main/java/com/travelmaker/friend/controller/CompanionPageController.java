package com.travelmaker.friend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value="/community")
public class CompanionPageController {

	@GetMapping(value="/list")
	public String communityList() {
		return "community/communityList";
	}
	
}
