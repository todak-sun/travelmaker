package com.travelmaker.store.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.travelmaker.store.service.StoreService;

@Component
@RequestMapping(value = "/main")
public class StorePageController {
	@Autowired
	StoreService storeService;
	
	@RequestMapping(value = "/test1", method = RequestMethod.GET)
	public String test() {
		return "/main/test";
	}
}
