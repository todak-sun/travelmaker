package com.travelmaker.essay.dao;

import com.travelmaker.essay.domain.EssayDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository(value = "essayDAO")
public class EssayDAOMybatis implements EssayDAO {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<EssayDTO> getAll() {
        return sqlSession.selectList("essaySQL.getAll");
    }

    @Override
    public EssayDTO getOne(int rno) {
        return sqlSession.selectOne("essaySQL.getOne", rno);
    }

    @Override
    public int create(EssayDTO essayDTO) {
        return sqlSession.insert("essaySQL.create", essayDTO);
    }
}
