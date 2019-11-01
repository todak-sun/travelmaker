package com.travelmaker.essay.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
public class EssayDTO {
	private int bno;
	private int rno;
	private String nickname;
	private String title;
	private int likes;
	private int views;
	private String hashtag;
	private String dateWrite;
	private String dateUpdate;
	private int cmt;
	private String location;
	private double lat;
	private double lng;
	private String content;
	private int fixed;
}
