package com.travelmaker.store.controller;

import com.travelmaker.store.domain.StoreHotelDTO;
import com.travelmaker.store.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/store")
public class StorePageController {

    @Autowired
    StoreService storeService;

    // 스토어 리스트
    @RequestMapping(value = "/list/{pg}", method = RequestMethod.GET)
    public String list(@PathVariable String pg, Model model) {
        model.addAttribute("pg", pg);
        return "/store/list";
    }

    // 스토어 상세정보
    @RequestMapping(value = "/view/{hnb}", method = RequestMethod.GET)
    public String view(@PathVariable String hnb, Model model) {
        StoreHotelDTO storeHotelDTO = storeService.getHotelView(hnb);
        model.addAttribute("hotel", storeHotelDTO);
        model.addAttribute("hnb", hnb);
        return "/store/view";
    }
}
