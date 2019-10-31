package com.travelmaker.etcboard.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReportDTO {
	private int bno;
	private int rno;
	private String reporter;
	private int category;
	private String content;
	private int solved;
}
