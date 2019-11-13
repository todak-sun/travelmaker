package com.travelmaker.etcboard.domain.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InquiryApiRequest {
    private int bno;
    private int iqno;
    private int seq;
    private String title;
    private String content;
    private int isPrivate;
}
