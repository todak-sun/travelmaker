package com.travelmaker.comment.domain.network.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentApiResponse {
    private int cno;
    private int bno;
    private String content;
    private int likes;
    private int unlikes;
    private int seq;
    private String dateWrite;
    private int pcno;
}
