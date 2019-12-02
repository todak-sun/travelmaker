package com.travelmaker.route.controller;

import com.travelmaker.route.domain.RouteContentDTO;
import com.travelmaker.route.domain.RouteDTO;
import com.travelmaker.route.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RequestMapping(value = "/route")
@Controller
public class RoutePageController {

    @Autowired
    RouteService routeService;

    @GetMapping(value = {"write","/write/{rno}"})
    public String routeWirteForm(Model model, @PathVariable Optional<Integer> rno) {
    	
    	// 해당 아이디로 작성중인 글이 있었다면 불러오겠냐고 한번 물어봐줌 , 예 하면 불러와주고 아니고 하면 DB에서 삭제함 ========= 나중에 추가할 기능
    	if(rno.isPresent()) {
	    	RouteDTO routeDTO = routeService.getRoute(rno.get());
	    	model.addAttribute("RouteDTO", routeDTO);
    	}
        // dto를 서버DB에 저장
        return "route/write";
    }
    
    @GetMapping(value = "/modify/{rno}")
    public String routeModifyForm(Model model, @PathVariable int rno) {
    	
    	
    	
    	return "route/write";
    }

    // 게시글 클릭시 들어오는 곳, 불러오기!!!
    @RequestMapping(value = "/view/{rno}", method = RequestMethod.GET)
    public String routeView(@PathVariable int rno, Model model) {
        System.out.println("rno = " + rno);
        
        // rno로 조회한 게시글 정보 가져옴
        RouteDTO routeDTO = routeService.getRoute(rno);
        
        model.addAttribute("routeDTO", routeDTO);
    	List<RouteContentDTO> list = routeService.getRouteContentStory(rno);
    	model.addAttribute("contentList", list);    	
    	
        return "route/view";
    }
    
    // 게시글 작성 중 미리보기
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

}
