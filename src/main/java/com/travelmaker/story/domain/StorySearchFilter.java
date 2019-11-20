package com.travelmaker.story.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StorySearchFilter {
	private int start;
	private int end;
	private int bno;
	private int rno;
	private int seq;
	private String title;
	private String hashtag;
	private String dateWrite;
	private String dateUpdate;
	private String fileName;
	private String imageName;
	private int isDomestic;
	private String nickname;
	private String keyword;
}
