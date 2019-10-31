package com.travelmaker.route.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RouteDTO {
	private int bno;
	private int rno;
	private String nickname;
	private String title;
	private String content;
	private int likes;
	private int views;
	private String hashtag;
	private String dateWrite;
	private String dateUpdate;
	private int comment;
	private int fixed;
}
