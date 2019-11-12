package com.travelmaker.story.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.travelmaker.story.service.StoryService;

@RequestMapping(value = "/story")
@Controller
public class StoryPageController {
	
	@Autowired
	StoryService storyService;
	
	@GetMapping(value = "/list")
	public String list(Model model) {
		
		return "/story/storyList";
	}
	
	@GetMapping(value = "/list/{bno}")
	public ModelAndView view(@PathVariable int bno, ModelAndView mv) {
		String board = storyService.selectBoard(bno);
		mv.setViewName(board+"/view/"+bno);
		return mv;
	}
}
