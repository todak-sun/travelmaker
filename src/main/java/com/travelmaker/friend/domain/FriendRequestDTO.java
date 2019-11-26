package com.travelmaker.friend.domain;

import org.springframework.stereotype.Component;
import java.sql.Date;

import lombok.Data;

@Data
@Component
public class FriendRequestDTO {
	private int fcno;
	private int fccno;
	private int seq;
	private String content;
	private int is_permit;
	private String dateStart;
	private String dateEnd;
	private int is_read;
}
