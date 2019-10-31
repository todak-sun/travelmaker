package com.travelmaker.friend.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FriendDTO {
	private int fno;
	private int bno;
	private String nickname;
	private String dateStart;
	private String dateEnd;
	private String locations;
	private String content;
	private int countCurr;
	private int countMax;
	private String dateWrite;
	private String dateUpdate;
	
}
