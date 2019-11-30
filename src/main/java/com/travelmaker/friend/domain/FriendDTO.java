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
<<<<<<< Updated upstream
	private List<FriendRouteDTO> friendRouteDTOs;
=======
>>>>>>> Stashed changes
	private List<String> citys;
}
