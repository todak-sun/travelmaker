package com.travelmaker.route.controller;

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

@RequestMapping(value = "/route")
@Controller
public class RoutePageController {

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
