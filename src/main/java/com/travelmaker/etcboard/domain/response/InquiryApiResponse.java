package com.travelmaker.etcboard.domain.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InquiryApiResponse {
    private int bno;
    private int iqno;
    private int seq;
    private String title;
    private String content;
    private int isPrivate;
    private String dateWrite;
}
