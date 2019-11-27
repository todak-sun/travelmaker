package com.travelmaker.etcboard.domain;

import com.fasterxml.jackson.annotation.JsonEnumDefaultValue;
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
public class ReportDTO {
	private int bno;
	private int reno;
	private int seq;
	@JsonEnumDefaultValue
	private ReportCategory category;
	private String content;
	private int isSolved;
	private String dateWrite;
	private int pbno;
}
