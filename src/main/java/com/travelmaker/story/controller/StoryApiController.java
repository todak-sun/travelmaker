package com.travelmaker.story.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.travelmaker.story.domain.StoryDTO;
import com.travelmaker.story.service.StoryService;

@RestController
@RequestMapping(value = "/api/story")
public class StoryApiController {
	
	@Autowired
	StoryService storyService;

	@RequestMapping(value = "/list")
	public List<StoryDTO> getList() {
		
		Map<String, String> pagingMap = new HashMap<String, String>();
		pagingMap.put("startNum", "0");
		pagingMap.put("endNum", "13");
		List<StoryDTO> list = storyService.getStory(pagingMap);
		
		return list;
	}
	
	@RequestMapping(value = "/list/{start}/{end}", method = RequestMethod.GET)
	public List<StoryDTO> showList(@PathVariable int start, @PathVariable int end) {
		
		Map<String, String> pagingMap = new HashMap<String, String>();
		pagingMap.put("startNum", (start-1)+"");
		pagingMap.put("endNum", (end+1)+"");
		List<StoryDTO> list = storyService.getStory(pagingMap);
		
		return list;
	}
	
	@GetMapping(value = "/list/{bno}")
	public String view(@PathVariable int bno) {
		String board = storyService.selectBoard(bno);
		return board+"/view/"+bno;
	}

}
