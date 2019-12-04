package com.travelmaker.comment.dao;

import com.travelmaker.comment.domain.CommentDTO;

import java.util.List;

public interface CommentDAO {
    CommentDTO create(CommentDTO commentDTO);

    CommentDTO createRe(CommentDTO commentDTO);

    List<CommentDTO> readAll(int bno);

    CommentDTO update(CommentDTO commentDTO);

    CommentDTO readOne(int cno);

    void delete(int cno);

    void deleteAll(int bno);
}
