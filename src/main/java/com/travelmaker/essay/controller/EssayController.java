package com.travelmaker.essay.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/essay")
public class EssayController {

	@GetMapping(produces = "application/json; charset=UTF-8")
	@ResponseBody
	public Map<String, String> get() {
		Map<String, String> map = new HashMap<String, String>();
		map.put("test", "success");
		return map;
	}

}
