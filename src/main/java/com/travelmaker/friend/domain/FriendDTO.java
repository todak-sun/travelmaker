package com.travelmaker.friend.domain;

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
	private String date_start;
	private String date_end;
	private int is_finish;
	private String kakao_chat;
	private String data_of_issue;
}
