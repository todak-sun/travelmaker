package com.travelmaker.essay.controller;

import com.travelmaker.essay.domain.EssayDTO;
import com.travelmaker.essay.ifs.EssayPageInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/essay")
public class EssayPageController{

	@Autowired
	EssayPageInterface essayPageService;

	@GetMapping("/write")
	public String write() {
		return "/essay/write2";
	}

	@GetMapping("/view")
	public String view() {
		return "/essay/view2";
	}

	@GetMapping("/view/{rno}")
	public ModelAndView view(@PathVariable int rno, ModelAndView mv){
		EssayDTO essayDTO = essayPageService.readOne(rno);
		mv.addObject("essayDTO", essayDTO);
		mv.setViewName("/essay/view");
		return mv;
	}

}
