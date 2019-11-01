package com.travelmaker.essay.controller;

import com.travelmaker.essay.domain.EssayDTO;
import com.travelmaker.essay.service.EssayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/essay")
public class EssayController {

	@Autowired
	EssayService essayService;

	@GetMapping(produces = "application/json; charset=UTF-8")
	public List<EssayDTO> essay() {
		return essayService.getEssay();
	}

	@GetMapping(path="/{rno}" ,produces = "application/json; charset=UTF-8")
	public EssayDTO essayOne(@PathVariable int rno){
		return essayService.getEssayOne(rno);
	}

	@PostMapping(produces = "application/json; charset=UTF-8")
	public String createOne(@ModelAttribute EssayDTO essayDTO){
		System.out.println(essayDTO.getNickname());
		int result = essayService.createEssay(essayDTO);
		if(result == 1) {
			return "OK";
		} else {
			return "FAIL";
		}
	}

	@DeleteMapping(path="/{rno}", produces ="application/json; charset=UTF-8")
	public String deleteOne(){
		return null;
	}
}
