package com.travelmaker.story.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.travelmaker.route.domain.RouteContentDTO;
import com.travelmaker.route.domain.RouteDTO;
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
	public String view(@PathVariable int bno) {
		String board = storyService.selectBoard(bno);
		return "redirect:/"+board+"/view/"+bno;
	}
	
	@RequestMapping(value = "routeStoryView", method = RequestMethod.GET)
	public String routeStoryView(@RequestParam String bno, Model model) {
		System.out.println("bno = " + bno);
		RouteDTO routeDTO = storyService.getRoute(bno);
		System.out.println(routeDTO.getBno());
		model.addAttribute("routeDTO", routeDTO);
		
		return "/story/routeStoryView";
	}
	@RequestMapping(value = "getRouteContentStory", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView getRouteContentStory(@ModelAttribute RouteDTO routeDTO) {
		ModelAndView modelAndView = new ModelAndView();
		int rno = routeDTO.getRno();
		System.out.println(rno);
		
		List<RouteContentDTO> list = storyService.getRouteContentStory(rno);
		
		System.out.println("리스트 = " + list.size());
		System.out.println("image 총사이즈 : " + list.get(0).getImgs().size());
		
		modelAndView.addObject("list", list);
		modelAndView.setViewName("jsonView");
		
		return modelAndView;
	}
//	// Image
//	@RequestMapping(value = "getRouteImageStory", method = RequestMethod.POST)
//	@ResponseBody
//	public ModelAndView getRouteImageStory(@RequestParam(value = "crnoList[]") List<String> crnoList) {
//		ModelAndView modelAndView = new ModelAndView();
//
//		List<RouteImageDTO> list = storyService.getRouteImage(crnoList);
//		
//		modelAndView.addObject("list", list);
//		modelAndView.setViewName("jsonView");
//		
//		return modelAndView;
//	}
}
