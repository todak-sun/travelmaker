package com.travelmaker.friend.domain;

import com.travelmaker.user.domain.UserDTO;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.List;

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
	private UserDTO user;
	private List<FriendRouteDTO> friendRouteDTOs;
	private List<String> citys;
}
