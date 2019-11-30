package com.travelmaker.friend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.travelmaker.friend.domain.FriendDTO;
import com.travelmaker.friend.domain.FriendPaging;
import com.travelmaker.friend.domain.FriendRequestDTO;
import com.travelmaker.friend.domain.FriendRouteDTO;
import com.travelmaker.friend.service.FriendService;

@RestController
@RequestMapping("/friend")
public class FriendApiController {
	@Autowired
	private FriendService friendService;
	@Autowired
	private FriendPaging friendPaging;
	
	@PostMapping(path = "/getList", produces = "application/json")
	public ModelAndView getList(@RequestParam(required = false, defaultValue = "1") String pg) {
		ModelAndView modelAndView = new ModelAndView();
		
		int endNum = Integer.parseInt(pg) * 5;
		int startNum = endNum - 4;
		
		Map<String, Integer> map = new HashMap<String, Integer>();
		
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		
		List<FriendDTO> list = friendService.getList(map);
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
		for(FriendDTO friendDTO : list) {
			System.out.println(friendDTO.getDateStart());
		}
=======
>>>>>>> 3fb8553d71ee68629160b3597a957197aa8473a1
>>>>>>> Stashed changes
		
		int totalA = friendService.getTotalA();
		
		friendPaging.setCurrentPage(Integer.parseInt(pg));
		friendPaging.setPageBlock(3);
		friendPaging.setPageSize(5);
		friendPaging.setTotalA(totalA);
		friendPaging.makePagingHTML();
		
		modelAndView.addObject("list", list);
		modelAndView.addObject("friendPaging", friendPaging);
		modelAndView.setViewName("jsonView");
		
		return modelAndView;
		
		/*if(list == null) {
			return new ResponseEntity<List<FriendDTO>>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<FriendDTO>>(list, HttpStatus.OK);*/
	}
	
	// 동행 글쓰기 작은틀 저장
	@PostMapping(value = "/setRouteWrite")
	public void setRouteWrite(@ModelAttribute FriendRouteDTO friendRouteDTO) {
		System.out.println(friendRouteDTO);
		friendService.setRouteWrite(friendRouteDTO);
	}
	// 취소버튼 클릭 후 작성중인 데이터 삭제
	@PostMapping(value = "/cancelWrite")
	public void cancelWrite(@RequestParam String fno) {
		friendService.cancelWrite(fno);
	}
	
	// view에서 작은게시글 select
	@PostMapping(value = "/getRouteView")
	public ModelAndView getRouteView(@RequestParam String fno) {
		ModelAndView modelAndView = new ModelAndView();
		List<FriendRouteDTO> list = friendService.getRouteView(fno);
		
		for(FriendRouteDTO friendRouteDTO : list) {
			for(int i = 0; i < friendRouteDTO.getFriendRequestDTOs().size(); i++) {
				System.out.println(friendRouteDTO.getFriendRequestDTOs().get(i).toString());
			}
		}
<<<<<<< HEAD
		System.out.println(list.size());
		
		for(FriendRouteDTO friendRouteDTO : list) {
			for(int i = 0; i < friendRouteDTO.getFriendRequestDTOs().size(); i++) {
				System.out.println(friendRouteDTO.getFriendRequestDTOs().get(i).toString());
			}
		}
=======
>>>>>>> parent of d38164a... 동행 수정
		System.out.println(list.size());
		
		modelAndView.addObject("list", list);
		modelAndView.setViewName("jsonView");
		
		return modelAndView;
	}
	
	// 신청 폼 저장
	@PostMapping(value = "/setRequestWrite")
	public void setRequestWrite(@ModelAttribute FriendRequestDTO friendRequestDTO) {
		friendService.setRequestWrite(friendRequestDTO);
	}
	
	// 신청글 수락, 거절
	@GetMapping(value = "/requestAccept")
	public void requestAccept(@RequestParam String fccno) {
		friendService.requestAccept(fccno);
	}
	@GetMapping(value = "/requestReject")
	public void requestReject(@RequestParam String fccno) {
		friendService.requestReject(fccno);
	}
}
