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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
    	List<RouteContentDTO> list = routeService.getRouteContentStory(rno);
    	model.addAttribute("contentList", list);
    	
        return "route/view";
    }
    
    @RequestMapping(value = "/preview/{rno}", method = RequestMethod.GET)
    public String routePreview(@PathVariable int rno, Model model) {
    	System.out.println("rno = " + rno);
    	RouteDTO routeDTO = routeService.getRoute(rno);
    	System.out.println(routeDTO.getBno());
    	model.addAttribute("routeDTO", routeDTO);
    	List<RouteContentDTO> list = routeService.getRouteContentStory(rno);
    	model.addAttribute("contentList", list);	

    	
    	return "route/preview";
    }

    @RequestMapping(value = "getRouteView", method = RequestMethod.POST)
    @ResponseBody
    public ModelAndView getRouteView(@ModelAttribute RouteDTO routeDTO, HttpServletRequest req, HttpServletResponse res) {
        ModelAndView modelAndView = new ModelAndView();
        int rno = routeDTO.getRno();
        int seq = routeDTO.getSeq();
        boolean view = false;
        List<RouteContentDTO> list = routeService.getRouteContentStory(rno);
        
    	Map<String, String> map = new HashMap<String, String>();
    	Cookie[] cookies = req.getCookies();
    	
    	// 쿠키로 조회한 적 있는지 확인
    	if(cookies != null) {
    		for(Cookie cookie : cookies) {
    			if(cookie.getValue().equals(rno+"")&&cookie.getName().equals(seq+"")) {
    				System.out.println("이미 조회 했음 rno : "+rno+" seq : "+seq);
    				view = true;
    			}
    		}
    	}
    	
    	// 조회 안했으면 조회수 1 올림
    	if(!view) {
    		routeService.updateViews(rno);
        	Cookie cookie = new Cookie(seq+"",rno+"");	
        	// 조회 초기화 시간 24시간
        	cookie.setMaxAge(60*60*24);
        	res.addCookie(cookie);
    	}

        System.out.println("리스트 = " + list.size());
        System.out.println("image 총사이즈 : " + list.get(0).getImgs().size());

        modelAndView.addObject("list", list);
        modelAndView.setViewName("jsonView");

        return modelAndView;
    }
    
}
