package com.travelmaker.friend.domain;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
public class FriendDTO {
	private int fno;
	private String nickname;
	private String title;
	private String is_domestic;
	private String date_start;
	private String date_end;
	private int is_finish;
	private String kakao_chat;
	private String data_of_issue;
}
