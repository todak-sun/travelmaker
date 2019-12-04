package com.travelmaker.purchase.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.travelmaker.purchase.domain.PurchaseDTO;
import com.travelmaker.purchase.service.PurchaseService;

@Controller
@RequestMapping(value = "/pur")
public class PurchasePageController {

	@Autowired PurchaseService purchaseService;
	
	@RequestMapping(value = "/list/{pg}", method = RequestMethod.GET)
	public String list(@PathVariable String pg, Model model) {
		model.addAttribute("pg", pg);
		return "/purchase/list";
	}

	// 글쓰기 페이지 이동
	@RequestMapping(value = "/write/{is_purchase}", method = RequestMethod.GET)
	public String write(@PathVariable String is_purchase, Model model) {
		String viewName = null;
		if(is_purchase.equals("1")) { //사다주세요
			viewName = "/purchase/write1";
		}else if(is_purchase.equals("0")) { //사다줄께요
			viewName = "/purchase/write0";
		}
		return viewName;
	}
	
	// 뷰페이지 이동
	@RequestMapping(value = "/view/{con}/{bno}", method = RequestMethod.GET)
	public String view(@PathVariable String con,@PathVariable String bno, Model model) {
		
		PurchaseDTO purchaseDTO = purchaseService.getPurchaseDTO(bno);
		model.addAttribute("purchaseDTO", purchaseDTO);
		
		String viewName = null;
		if(con.equals("1")) { //사다주세요
			viewName = "/purchase/view1";
		}else if(con.equals("2")) { //사다줄까요?
			viewName = "/purchase/view2";
		}
		return viewName;
	}
	
	//수정페이지 이동
	@RequestMapping(value="/modify/{bno}")
	public ModelAndView modify(@PathVariable String bno) {
		ModelAndView mav = new ModelAndView();
		//con : 1 사다주실분  2 사다드려요?
		PurchaseDTO purchaseDTO = purchaseService.getPurchaseDTO(bno);
		mav.addObject("purchaseDTO", purchaseDTO);
		
		if(purchaseDTO.getCon()==1) {
			mav.setViewName("/purchase/modify1");
		}else if(purchaseDTO.getCon()==2) {
			mav.setViewName("/purchase/modify2");
		}else {
			System.out.println("ERROR");
		}
		
		return mav;
	}
	
}
