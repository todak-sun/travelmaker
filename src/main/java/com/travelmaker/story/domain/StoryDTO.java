package com.travelmaker.story.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StoryDTO {
	private int bno; 
	private int rno; 
	private int seq;
	private String title; 
	private int likes; 
	private int views; 
	private int cmt;
	private String hashtag; 
	private String dateWrite; 
	private String dateUpdate; 
	private String fileName; 
	private String imageName; 
	private int fixed; 
	private int isDomestic; 
	private String nickname;
	private String imgprofile;
}
