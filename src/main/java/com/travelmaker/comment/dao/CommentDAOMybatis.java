package com.travelmaker.comment.dao;

import com.travelmaker.comment.domain.CommentDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository(value = "commentDAO")
public class CommentDAOMybatis implements CommentDAO{

    @Autowired
    SqlSession sqlSession;

    @Override
    public CommentDTO readOne(int cno) {
        CommentDTO commentDTO = sqlSession.selectOne("commentSQL.readOne", cno);
        return commentDTO;
    }

    @Override
    public List<CommentDTO> readAll(int bno) {
        List<CommentDTO> commentDTOList = sqlSession.selectList("commentSQL.readAll", bno);
        return commentDTOList;
    }

    @Override
    public CommentDTO create(CommentDTO commentDTO) {
        sqlSession.insert("commentSQL.create", commentDTO);
        return sqlSession.selectOne("commentSQL.readOne", commentDTO.getCno());
    }

    @Override
    public CommentDTO createRe(CommentDTO commentDTO) {
        int cno = sqlSession.insert("commentSQL.createRe", commentDTO);
        CommentDTO savedCommentDTO = sqlSession.selectOne("commentSQL.readOne", cno);
        return savedCommentDTO;
    }

    @Override
    public CommentDTO update(CommentDTO commentDTO) {
        sqlSession.update("commentSQL.update", commentDTO);
        CommentDTO updatedCommentDTO = sqlSession.selectOne("commentSQL.readOne", commentDTO.getCno());
        return updatedCommentDTO;
    }

    @Override
    public void delete(int cno) {
        sqlSession.delete("commentSQL.delete", cno);
    }

    @Override
    public void deleteAll(int bno) {
        sqlSession.delete("commentSQL.deleteAll", bno);
    }


}
