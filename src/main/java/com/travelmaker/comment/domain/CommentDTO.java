package com.travelmaker.comment.domain;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CommentDTO {
	private int cno;
	private int bno;
	private String content;
	private int likes;
	private int unlikes;
	private String nickname;
	private String dateWrite;
	private int pcno;
}
