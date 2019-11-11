package com.travelmaker.essay.domain;

import com.travelmaker.comment.domain.CommentDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class EssayDTO {
    private int bno; //게시물 전체가 공유하는 고유값.
    private int rno; //스토리형 게시물이 공유하는 고유값.
    private int seq; //user를 인식할 수 있는 고유값.
    private String title; //게시물의 제목
    private int likes; //좋아요 수
    private int views; //조회 수
    private String hashtag; //해쉬태그
    private String content; //게시물의 내용
    private String imageName; //이미지의 이름.
    private int fixed; //발행되었는지 안되었는지를 체크
    private int isDomestic; //국내 게시물인지, 해외 게시물인지 체크

    private String fileName; //게시물의 경로
    private String dateUpdate; //최근 수정일
    private String dateWrite; //최초 생성일

    private MultipartFile imageFile;

    private List<CommentDTO> commentDTOList;
}
