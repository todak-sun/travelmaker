package com.travelmaker.store.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travelmaker.store.domain.StoreHotelDTO;
import com.travelmaker.store.service.StoreService;

@RestController
@RequestMapping("/store")
public class StoreApiController {
	
	@Autowired
	StoreService storeService;
	
	// Store 전체 리스트
	@PostMapping(path = "/getHotelList", produces = "application/json")
	public ResponseEntity<List<StoreHotelDTO>> getHotelList() {
		List<StoreHotelDTO> list = storeService.getHotelList();
		
		if(list == null) {
			return new ResponseEntity<List<StoreHotelDTO>>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<StoreHotelDTO>>(list, HttpStatus.OK);
	}
	// Store View
	@PostMapping(value = "/getHotelView/{hnb}", produces = "application/json")
	public ResponseEntity<StoreHotelDTO> getHotelView(@PathVariable String hnb){
		StoreHotelDTO storeHotelDTO = storeService.getHotelView(hnb);
		
		if(storeHotelDTO == null) {
			return new ResponseEntity<StoreHotelDTO>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<StoreHotelDTO>(storeHotelDTO, HttpStatus.OK);
	}
}
