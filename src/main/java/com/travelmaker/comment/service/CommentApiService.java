package com.travelmaker.comment.service;

import com.travelmaker.comment.dao.CommentDAO;
import com.travelmaker.comment.domain.CommentDTO;
import com.travelmaker.comment.domain.network.request.CommentApiRequest;
import com.travelmaker.comment.domain.network.response.CommentApiResponse;
import com.travelmaker.comment.ifs.CommentApiInterface;
import com.travelmaker.model.network.Header;
import com.travelmaker.user.dao.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service(value = "commentApiService")
public class CommentApiService implements CommentApiInterface<CommentApiRequest, CommentApiResponse> {

    @Autowired
    CommentDAO commentDAO;

    @Autowired
    UserDAO userDAO;

    @Override
    public Header<List<CommentApiResponse>> readAll(int bno) {
        return Optional.ofNullable(commentDAO.readAll(bno))
                .map(this::response)
                .orElse(null);
    }

    @Override
    public Header<CommentApiResponse> create(int bno, Header<CommentApiRequest> request) {
        CommentApiRequest data = request.getData();
        CommentDTO commentDTO = CommentDTO.builder()
                .bno(bno)
                .content(data.getContent())
                .seq(data.getSeq())
                .build();
        CommentDTO savedCommentDTO = commentDAO.create(commentDTO);
        return response(savedCommentDTO);
    }

    @Override //대댓글 생성
    public Header<CommentApiResponse> create(int bno, int cno, Header<CommentApiRequest> request) {
        CommentApiRequest data = request.getData();
        CommentDTO commentDTO = CommentDTO.builder()
                .bno(bno)
                .content(data.getContent())
                .seq(data.getSeq())
                .pcno(cno)
                .build();
        CommentDTO savedCommentDTO = commentDAO.createRe(commentDTO);
        return response(savedCommentDTO);
    }

    @Override
    public Header<CommentApiResponse> update(Header<CommentApiRequest> request) {
        CommentApiRequest data = request.getData();
        return Optional.ofNullable(commentDAO.readOne(data.getCno()))
                .map((commentDTO) -> {
                    commentDTO.setContent(data.getContent())
                            .setLikes(data.getLikes())
                            .setUnlikes(data.getUnlikes());
                    return commentDAO.update(commentDTO);
                })
                .map(this::response)
                .orElseGet(() -> Header.ERROR("없는 데이터입니다."));
    }

    @Override
    public Header delete(int cno) {
        return Optional.ofNullable(commentDAO.readOne(cno))
                .map((commentDTO) -> {
                    commentDAO.delete(cno);
                    return Header.OK("삭제 성공");
                })
                .orElseGet(() -> Header.ERROR("없는 데이터"));
    }


    private Header<CommentApiResponse> response(CommentDTO commentDTO) {
        CommentApiResponse commentApiResponse = CommentApiResponse.builder()
                .cno(commentDTO.getCno())
                .bno(commentDTO.getBno())
                .seq(commentDTO.getSeq())
                .likes(commentDTO.getLikes())
                .unlikes(commentDTO.getUnlikes())
                .dateWrite(commentDTO.getDateWrite())
                .content(commentDTO.getContent())
                .userDTO(userDAO.getUserDTO(commentDTO.getSeq()))
                .build();
        return Header.OK(commentApiResponse, "데이터 조회 성공.");
    }

    private Header<List<CommentApiResponse>> response(List<CommentDTO> commentDTOList) {
        List<CommentApiResponse> commentApiResponseList = new ArrayList<>();
        commentDTOList.forEach((commentDTO) -> {
            CommentApiResponse essayApiResponse = CommentApiResponse.builder()
<<<<<<< Updated upstream
                    .cno(commentDTO.getCno())
                    .pcno(commentDTO.getPcno())
                    .bno(commentDTO.getBno())
                    .seq(commentDTO.getSeq())
                    .likes(commentDTO.getLikes())
                    .unlikes(commentDTO.getUnlikes())
                    .dateWrite(commentDTO.getDateWrite())
                    .content(commentDTO.getContent())
                    .userDTO(userDAO.getUserDTO(commentDTO.getSeq()))
=======
                    .cno(essayDTO.getCno())
                    .pcno(essayDTO.getPcno())
                    .bno(essayDTO.getBno())
                    .seq(essayDTO.getSeq())
                    .likes(essayDTO.getLikes())
                    .unlikes(essayDTO.getUnlikes())
                    .dateWrite(essayDTO.getDateWrite())
                    .content(essayDTO.getContent())
>>>>>>> Stashed changes
                    .build();
            commentApiResponseList.add(essayApiResponse);
        });
        return Header.OK(commentApiResponseList, "데이터 조회 성공");
    }
}
