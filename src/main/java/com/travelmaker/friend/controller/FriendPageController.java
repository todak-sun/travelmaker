package com.travelmaker.friend.controller;

import com.travelmaker.friend.domain.FriendDTO;
import com.travelmaker.friend.service.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value="/friend")
public class FriendPageController {
	@Autowired
	FriendService friendService;
	
	// 리스트 페이지 이동
	@RequestMapping(value="/list/{pg}", method = RequestMethod.GET)
	public String list(@PathVariable String pg, Model model) {
		model.addAttribute("pg", pg);
		// [용주] : 테스트를 위해 list2로 변경함!
		return "/friend/list2";
	}
	
	// 글쓰기 페이지 이동
	@RequestMapping(value = "/write/{is_domestic}", method = RequestMethod.GET)
	public String write(@PathVariable String is_domestic, Model model) {
		model.addAttribute("is_domestic", is_domestic);
		// [용주] : 테스트를 위해 write2로 변경함!!!
		return "/friend/write2";
	}
	// 큰 틀 저장 후 작은틀 글쓰기 이동
	@RequestMapping(value = "/setWrite", method = RequestMethod.POST)
	public String setWrite(@ModelAttribute FriendDTO friendDTO, Model model) {
		int fno = friendService.setWrite(friendDTO);
		model.addAttribute("is_domestic", friendDTO.getIs_domestic());
		model.addAttribute("fno", fno);
		model.addAttribute("friendDateStart", friendDTO.getDateStart());
		model.addAttribute("friendDateEnd", friendDTO.getDateEnd());
		// [용주] : 테스트를 위해 routeWrite2 변경함!!!
		return "/friend/routeWrite2";
	}
	@RequestMapping(value = "/view/{fno}", method = RequestMethod.GET)
	public String friendView(@PathVariable String fno, Model model) {
		FriendDTO friendDTO = friendService.getView(fno);
		model.addAttribute("friendDTO", friendDTO);
		// [용주] : 테스트를 위해 view2로 변경함!!!
		return "/friend/view2";
	}
}
