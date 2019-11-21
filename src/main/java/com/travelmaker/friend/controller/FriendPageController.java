package com.travelmaker.friend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.travelmaker.friend.domain.FriendDTO;
import com.travelmaker.friend.service.FriendService;

@Controller
@RequestMapping(value="/friend")
public class FriendPageController {
	@Autowired
	FriendService friendService;
	
	// 리스트 페이지 이동
	@RequestMapping(value="/list", method = RequestMethod.GET)
	public String list() {
		return "/friend/list";
	}
	
	// 글쓰기 페이지 이동
	@RequestMapping(value = "/write/{is_domestic}", method = RequestMethod.GET)
	public String write(@PathVariable String is_domestic, Model model) {
		model.addAttribute("is_domestic", is_domestic);
		
		return "/friend/write";
	}
	// 큰 틀 저장 후 작은틀 글쓰기 이동
	@RequestMapping(value = "/setWrite", method = RequestMethod.POST)
	public String setWrite(@ModelAttribute FriendDTO friendDTO, Model model) {
		int fno = friendService.setWrite(friendDTO);
		System.out.println(friendDTO.toString());
		model.addAttribute("is_domestic", friendDTO.getIs_domestic());
		model.addAttribute("fno", fno);
		
		return "/friend/routeWrite";
	}
	@RequestMapping(value = "/friendView/{fno}", method = RequestMethod.GET)
	public String friendView(@PathVariable String fno, Model model) {
		FriendDTO friendDTO = friendService.getView(fno);
		model.addAttribute("friendDTO", friendDTO);
		
		return "/friend/friendView";
	}
}
