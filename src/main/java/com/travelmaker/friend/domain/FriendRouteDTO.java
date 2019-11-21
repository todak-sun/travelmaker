package com.travelmaker.friend.domain;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
public class FriendRouteDTO {
	private int fno;
	private int fcno;
	private String date_start;
	private String date_end;
	private String content;
	private int fcnt;
	private int is_finish;
	private String lat;
	private String lng;
	private String city;
}
