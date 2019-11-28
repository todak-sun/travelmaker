package com.travelmaker.essay.domain.network.response;

import com.travelmaker.comment.domain.CommentDTO;
import com.travelmaker.user.domain.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EssayApiResponse {
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
    private String dateWrite;
    private String dateUpdate;
    private List<CommentDTO> commentDTOList;
    private UserDTO userDTO;
}
