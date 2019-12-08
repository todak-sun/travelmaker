package com.travelmaker.friend.controller;

import com.travelmaker.friend.domain.FriendDTO;
import com.travelmaker.friend.domain.FriendPaging;
import com.travelmaker.friend.domain.FriendRequestDTO;
import com.travelmaker.friend.domain.FriendRouteDTO;
import com.travelmaker.friend.service.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/friend")
public class FriendApiController {
	@Autowired
	private FriendService friendService;
	@Autowired
	private FriendPaging friendPaging;

	@GetMapping(path="/readBySeq", produces = "application/json")
	public ResponseEntity<List<FriendDTO>> readBySeq(@RequestParam int seq){
		return friendService.readBySeq(seq);
	}
	
	@PostMapping(path = "/getList", produces = "application/json")
	public ModelAndView getList(@RequestParam(required = false, defaultValue = "1") String pg) {
		ModelAndView modelAndView = new ModelAndView();
		
		int endNum = Integer.parseInt(pg) * 5;
		int startNum = endNum - 4;
		
		Map<String, Integer> map = new HashMap<String, Integer>();
		
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		
		List<FriendDTO> list = friendService.getList(map);
		
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
	}
	
	// 동행 글쓰기 작은틀 저장
	@PostMapping(value = "/setRouteWrite")
	public void setRouteWrite(@ModelAttribute FriendRouteDTO friendRouteDTO) {
		friendService.setRouteWrite(friendRouteDTO);
	}
	// division만 수정
	@PostMapping("/updateDivision")
	public void updateDivision(@ModelAttribute FriendRouteDTO friendRouteDTO) {
		friendService.updateDivision(friendRouteDTO);
	}
	// 취소버튼 클릭 후 작성중인 데이터 삭제
	@PostMapping(value = "/cancelWrite")
	public void cancelWrite(@RequestParam String fno) {
		friendService.cancelWrite(fno);
	}
	
	// 신청글 가져오기
	@PostMapping(value = "/getRequestView")
	public ModelAndView getRequestView(@RequestParam String fcno) {
		System.out.println("fcno : " + fcno);
		ModelAndView modelAndView = new ModelAndView();
		List<FriendRequestDTO> list = friendService.getRequestView(fcno);
		
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
	
	// 게시글 삭제
	@DeleteMapping(value = "/delete")
	public void delete(@RequestBody String fno) {
		Map<String, String> map = new HashMap<String, String>();
		
		map.put("header", "friend");
		map.put("dataseq", fno);
		friendService.delete(map);
	}
	
	// 큰틀 수정
	@PostMapping(value = "/setModify")
	public void setModify(@ModelAttribute FriendDTO friendDTO) {
		System.out.println(friendDTO.toString());
		friendService.setModify(friendDTO);
	}
	@PostMapping(value = "/getRouteModify")
	public ResponseEntity<List<FriendRouteDTO>> getRouteModify(@RequestParam String fno) {
		System.out.println(fno);
		List<FriendRouteDTO> list = friendService.getRouteModify(fno);
		
		if(list == null) {
			return new ResponseEntity<List<FriendRouteDTO>>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<FriendRouteDTO>>(list, HttpStatus.OK);
	}
	
	@PutMapping(value = "/setRouteModify")
	public void setRouteModify(@RequestBody FriendRouteDTO friendRouteDTO) throws Exception {
		System.out.println(friendRouteDTO.toString());
		friendService.setRouteModify(friendRouteDTO);
	}
}
