package com.travelmaker.essay.domain.network.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EssayApiRequest {
    private int bno;
    private int rno;
    private int seq;
    private String title;
    private int likes;
    private int views;
    private String hashtag;
    private String content;
    private String imageName;
    private int fixed;
    private int isDomestic;
    private MultipartFile imageFile;
}
