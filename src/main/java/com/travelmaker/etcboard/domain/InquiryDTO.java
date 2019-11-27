package com.travelmaker.etcboard.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Accessors(chain = true)
public class InquiryDTO {
	private int bno;
	private int iqno;
	private int seq;
	private String title;
	private String content;
	private int isPrivate;
	private String dateWrite;
}
