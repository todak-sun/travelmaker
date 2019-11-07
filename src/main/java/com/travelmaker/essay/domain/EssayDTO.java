package com.travelmaker.essay.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
public class EssayDTO {
    private int bno;
    private int rno;
    private int seq; //user를 인식할 수 있는 아이디 값
    private String title;
    private int likes;
    private int views;
    private String hashtag;
    private String dateWrite;
    private String dateUpdate;
    private int cmt;
    private String content;
    private String filepath;
    private int fixed;
    private int isDomestic;
}
