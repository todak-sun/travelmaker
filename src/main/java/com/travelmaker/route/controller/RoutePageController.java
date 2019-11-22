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

    @RequestMapping(value = "/write")
    public String routeWirteForm(Model model, @RequestParam int isDomestic) {
    	
    	// 해당 아이디로 작성중인 글이 있었다면 불러오겠냐고 한번 물어봐줌 , 예 하면 불러와주고 아니고 하면 DB에서 삭제함 ========= 나중에 추가할 기능
    	
        model.addAttribute("isDomestic", isDomestic);
        // dto를 서버DB에 저장
        return "route/write";
    }

    //////
    @RequestMapping(value = "/view/{rno}", method = RequestMethod.GET)
    public String routeView(@PathVariable int rno, Model model) {
        System.out.println("rno = " + rno);
        RouteDTO routeDTO = routeService.getRoute(rno);
        System.out.println(routeDTO.getBno());
        model.addAttribute("routeDTO", routeDTO);

        return "route/view";
    }
    
    @RequestMapping(value = "/preview/{rno}", method = RequestMethod.GET)
    public String routePreview(@PathVariable int rno, Model model) {
    	System.out.println("rno = " + rno);
    	RouteDTO routeDTO = routeService.getRoute(rno);
    	System.out.println(routeDTO.getBno());
    	model.addAttribute("routeDTO", routeDTO);
    	
    	return "route/preview";
    }

    @RequestMapping(value = "getRouteView", method = RequestMethod.POST)
    @ResponseBody
    public ModelAndView getRouteView(@ModelAttribute RouteDTO routeDTO) {
        ModelAndView modelAndView = new ModelAndView();
        int rno = routeDTO.getRno();
        System.out.println("getRouteView rno 값 : "+rno);

        List<RouteContentDTO> list = routeService.getRouteContentStory(rno);

        System.out.println("리스트 = " + list.size());
        System.out.println("image 총사이즈 : " + list.get(0).getImgs().size());

        modelAndView.addObject("list", list);
        modelAndView.setViewName("jsonView");

        return modelAndView;
    }
    
}
