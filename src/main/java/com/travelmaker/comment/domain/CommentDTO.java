package com.travelmaker.comment.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

@Setter
@Getter
@Builder
@Accessors(chain = true)
@ToString
public class CommentDTO {
	private int cno;
	private int bno;
	private String content;
	private int likes;
	private int unlikes;
	private int seq;
	private String dateWrite;
	private int pcno;
}
