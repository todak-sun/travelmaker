package com.travelmaker.home.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping(value = "/")
    public String home() {
        return "main/main";
    }

    @RequestMapping(value = "/mypage")
    public String mypage() {
        return "main/mypage";
    }

}
