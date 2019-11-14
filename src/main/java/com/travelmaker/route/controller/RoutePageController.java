package com.travelmaker.route.controller;

<<<<<<< HEAD
import com.travelmaker.route.domain.RouteContentDTO;
import com.travelmaker.route.domain.RouteDTO;
import com.travelmaker.route.service.RouteService;
import com.travelmaker.story.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
=======
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.travelmaker.route.domain.RouteContentDTO;
import com.travelmaker.route.domain.RouteDTO;
import com.travelmaker.route.domain.RouteImageDTO;
import com.travelmaker.route.service.RouteService;
import com.travelmaker.story.service.StoryService;
>>>>>>> 586671ae114d8b2a9c3d6a1660afc4ea93908b98

@RequestMapping(value = "/route")
@Controller
public class RoutePageController {

<<<<<<< HEAD
    @Autowired
    RouteService routeService;

    @Autowired
    StoryService storyService;

    @RequestMapping(value = "write")
    public String routeWirteForm(Model model, @RequestParam int isDomestic) {
        model.addAttribute("isDomestic", isDomestic);
        // dto를 서버DB에 저장
        return "/route/routeWriteForm";
    }

    @RequestMapping(value = "/view/{bno}", method = RequestMethod.GET)
    public String routeStoryView(@PathVariable String bno, Model model) {
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


}
=======
	@Autowired
	RouteService routeService;
	
	@Autowired
	StoryService  storyService;

	@RequestMapping(value = "write")
	public String routeWirteForm(Model model, @RequestParam int isDomestic) {
		model.addAttribute("isDomestic", isDomestic);
		// dto를 서버DB에 저장
		return "/route/routeWriteForm";
	}

	@RequestMapping(value = "/view/{bno}", method = RequestMethod.GET)
	public String routeStoryView(@PathVariable String bno, Model model) {
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
	
	
}
>>>>>>> 586671ae114d8b2a9c3d6a1660afc4ea93908b98
