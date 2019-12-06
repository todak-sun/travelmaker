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

    @GetMapping(value = {"write", "/write/{rno}"})
    public String routeWirteForm(Model model, @PathVariable Optional<Integer> rno) {

        if (rno.isPresent()) { // 수정으로 들어왔다면 Route 와 RouteContent 를 모델에 담는다
            model.addAttribute("routeDTO", routeService.getRoute(rno.get()));
            model.addAttribute("contentList", routeService.getRouteContentStory(rno.get()));
        }

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
