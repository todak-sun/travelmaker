package com.travelmaker.etcboard.domain.request;

import com.fasterxml.jackson.annotation.JsonEnumDefaultValue;
import com.travelmaker.etcboard.domain.ReportCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportApiRequest {
    private int bno;
    private int reno;
    private int seq;
    @JsonEnumDefaultValue
    private ReportCategory category;
    private String content;
    private int isSolved;
    private int pbno;
}
