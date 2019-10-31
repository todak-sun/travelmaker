package com.travelmaker.essay.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/essay")
public class EssayController {

	@RequestMapping(value = "/")
	public Map<String, String> getAll() {
		Map<String, String> map = new HashMap<String, String>();
		map.put("test", "success");
		return map;
	}

}
