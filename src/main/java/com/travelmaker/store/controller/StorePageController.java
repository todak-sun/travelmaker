package com.travelmaker.store.controller;

import org.springframework.beans.factory.annotation.Autowired;
<<<<<<< Updated upstream
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.travelmaker.store.domain.StoreHotelDTO;
import com.travelmaker.store.service.StoreService;

@Controller
@RequestMapping(value = "/store")
=======
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.travelmaker.store.service.StoreService;

@Component
@RequestMapping(value = "/main")
>>>>>>> Stashed changes
public class StorePageController {
	@Autowired
	StoreService storeService;
	
<<<<<<< Updated upstream
	// 스토어 리스트
	@RequestMapping(value = "/list/{pg}", method = RequestMethod.GET)
	public String list(@PathVariable String pg, Model model) {
		model.addAttribute("pg", pg);
		
		return "/store/list";
	}
	
	// 스토어 상세정보
	@RequestMapping(value = "/view/{hnb}", method = RequestMethod.GET)
	public String view(@PathVariable String hnb, Model model) {
		model.addAttribute("hnb", hnb);
		
		return "/store/view";
=======
	@RequestMapping(value = "/test1", method = RequestMethod.GET)
	public String test() {
		return "/main/test";
>>>>>>> Stashed changes
	}
}
