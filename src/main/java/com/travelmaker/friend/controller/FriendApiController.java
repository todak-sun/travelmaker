package com.travelmaker.friend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travelmaker.friend.domain.FriendDTO;
import com.travelmaker.friend.domain.FriendRouteDTO;
import com.travelmaker.friend.service.FriendService;

@RestController
@RequestMapping("/friend")
public class FriendApiController {
	@Autowired
	FriendService friendService;
	
	@PostMapping(path = "/getList", produces = "application/json")
	public ResponseEntity<List<FriendDTO>> getList() {
		List<FriendDTO> list = friendService.getList();
		
		if(list == null) {
			return new ResponseEntity<List<FriendDTO>>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<FriendDTO>>(list, HttpStatus.OK);
	}
	
	// 동행 글쓰기 작은틀 저장
	@PostMapping(value = "/setRouteWrite")
	public void setRouteWrite(@ModelAttribute FriendRouteDTO friendRouteDTO) {
		friendService.setRouteWrite(friendRouteDTO);
	}
	// 취소버튼 클릭 후 작성중인 데이터 삭제
	@PostMapping(value = "/cancelWrite")
	public void cancelWrite(@RequestBody String fno) {
		String[] temp = fno.split("=");
		fno = temp[0];
		friendService.cancelWrite(fno);
	}
}
