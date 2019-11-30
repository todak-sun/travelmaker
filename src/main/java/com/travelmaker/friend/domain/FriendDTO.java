package com.travelmaker.friend.domain;

import java.util.List;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class FriendDTO {
	private int fno;
	private int seq;
	private String id;
	private String title;
	private String is_domestic;
	private String dateStart;
	private String dateEnd;
	private int is_finish;
	private String kakao_chat;
	private String date_of_issue;
	private String nickname; // nickName 추가 (DB X)
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< Updated upstream
	private List<FriendRouteDTO> friendRouteDTOs;
=======
>>>>>>> Stashed changes
=======
>>>>>>> parent of d38164a... 동행 수정
=======
>>>>>>> parent of d38164a... 동행 수정
	private List<String> citys;
}
