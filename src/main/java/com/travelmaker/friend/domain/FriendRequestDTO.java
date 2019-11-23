package com.travelmaker.friend.domain;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class FriendRequestDTO {
	private int fcno;
	private int fccno;
	private int seq;
	private String content;
	private int is_permit;
	private String date_start;
	private String date_end;
	private int is_read;
}
