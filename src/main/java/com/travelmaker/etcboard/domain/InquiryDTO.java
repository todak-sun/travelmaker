package com.travelmaker.etcboard.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InquiryDTO {
	private int bno;
	private int ino;
	private String nickname;
	private String title;
	private String content;
	private int privated;
	private String dateWrite;
}
