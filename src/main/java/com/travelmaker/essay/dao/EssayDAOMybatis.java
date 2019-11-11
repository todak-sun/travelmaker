package com.travelmaker.essay.dao;

import com.travelmaker.essay.domain.EssayDTO;
import com.travelmaker.essay.domain.EssaySearchFilter;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository(value = "essayDAO")
public class EssayDAOMybatis implements EssayDAO {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public EssayDTO readOne(int rno) {
        return sqlSession.selectOne("essaySQL.readOne", rno);
    }

    @Override
    public List<EssayDTO> readAll(EssaySearchFilter essaySearchFilter) {
        return sqlSession.selectList("essaySQL.search", essaySearchFilter);
    }

    @Override
    public EssayDTO create(EssayDTO essayDTO) {
        sqlSession.insert("essaySQL.create", essayDTO);
        return sqlSession.selectOne("essaySQL.readOne", essayDTO.getRno());
    }

    @Override
    public EssayDTO update(EssayDTO essayDTO) {
        sqlSession.update("essaySQL.update", essayDTO);
        return sqlSession.selectOne("essaySQL.readOne", essayDTO.getRno());
    }

    @Override
    public void delete(int rno) {
        sqlSession.delete("essaySQL.delete", rno);
    }

    @Override
    public List<EssayDTO> readAll() {
        return sqlSession.selectList("essaySQL.getAll");
    }

}
