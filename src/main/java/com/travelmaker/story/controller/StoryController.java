package com.travelmaker.story.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.travelmaker.story.domain.StoryDTO;
import com.travelmaker.story.service.StoryService;

@RequestMapping(value = "/story")
@Controller
public class StoryController {
	
	@Autowired
	StoryService storyService;
	
	@RequestMapping(value = "list", method = RequestMethod.GET)
	public String list(Model model) {
		
//		List<StoryDTO> list = storyService.getStory();
//		System.out.println(list.get(0).getTitle());
//		model.addAttribute("list",list);
		
		return "/story/storyList";
	}
	
	@RequestMapping(value = "getList")
	@ResponseBody
	public Map<String, Object> getList(int startNum, int endNum) {
		
		Map<String, String> pagingMap = new HashMap<String, String>();
		pagingMap.put("startNum", (startNum-1)+"");
		pagingMap.put("endNum", (endNum+1)+"");
		List<StoryDTO> list = storyService.getStory(pagingMap);
		
		Map<String, Object> map = new HashMap<String, Object>();
		for(int i = 0; i < list.size(); i++) {
			map.put((startNum+i)+"", list.get(i));
		}
		
		return map;
	}
}
