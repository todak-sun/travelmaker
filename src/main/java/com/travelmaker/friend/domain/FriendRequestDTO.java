package com.travelmaker.friend.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FriendRequestDTO {
	private int fno;
	private String nickname;
	private int accepted;
	private String dateStart;
	private String dateEnd;
	private String content;
	private String dateWrite;
}
