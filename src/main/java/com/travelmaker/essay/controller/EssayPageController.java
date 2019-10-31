package com.travelmaker.essay.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/essay")
public class EssayPageController {

	@GetMapping(value = "/write")
	public String write() {
		return "/essay/write";
	}

}
