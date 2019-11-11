package com.travelmaker.comment.domain.network.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentApiRequest {
    private int cno;
    private int bno;
    private String content;
    private int likes;
    private int unlikes;
    private int seq;
    private String date_write;
    private int pcno;
}
