package com.travelmaker.etcboard.domain.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportApiResponse {
    private int bno;
    private int reno;
    private int seq;
    private String category;
    private String content;
    private int isSolved;
    private String dateWrite;
    private int pbno;
}
