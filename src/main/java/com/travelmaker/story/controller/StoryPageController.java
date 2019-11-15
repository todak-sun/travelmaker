package com.travelmaker.story.controller;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.travelmaker.story.service.StoryService;

@RequestMapping(value = "/story")
@Controller
public class StoryPageController {
	
	@Autowired
	StoryService storyService;
	
	// 처음 & 뒤로가기 등 모든 리스트 불러올 때
	@GetMapping(path = {"","/{listNum}/","/{listNum}/{keyword}"})
	public String showList(Model model, @PathVariable Optional<Integer> listNum, @PathVariable Optional<String> keyword) {
	
		model.addAttribute("listNum",listNum.isPresent() ? listNum.get() : 12);
		model.addAttribute("keyword",keyword.isPresent() ? keyword.get() : "");
		return "/story/storyList";
	}

}
