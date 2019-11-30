package com.travelmaker.friend.domain;

import java.sql.Date;
import java.util.List;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class FriendRouteDTO {
	private int fno;
	private int fcno;
	private String dateStart;
	private String dateEnd;
	private String content;
	private int fcnt;
	private int is_finish;
	private double lat;
	private double lng;
	private String city;
	private List<FriendRequestDTO> friendRequestDTOs;
}
