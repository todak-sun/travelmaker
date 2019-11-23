package com.travelmaker.friend.domain;

import java.sql.Date;

import lombok.Data;

@Data
public class FriendRequestDTO {
	private int fcno;
	private int fccno;
	private int seq;
	private String content;
	private int is_permit;
	private Date date_start;
	private Date date_end;
	private int is_read;
}
