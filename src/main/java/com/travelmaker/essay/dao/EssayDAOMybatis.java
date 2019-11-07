package com.travelmaker.essay.dao;

import com.travelmaker.essay.domain.EssayDTO;
import com.travelmaker.essay.domain.EssayImageDTO;
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
    public int saveEssayTmp(EssayDTO essayDTO) {
        sqlSession.insert("essaySQL.saveEssayTmp", essayDTO);
        return sqlSession.selectOne("essaySQL.getRno");
    }

    @Override
    public int saveImage(EssayImageDTO essayImageDTO) {
        return sqlSession.insert("essaySQL.saveImage", essayImageDTO);
    }

    @Override
    public int saveEssay(EssayDTO essayDTO) {
        return sqlSession.update("essaySQL.saveEssay", essayDTO);
    }

    @Override
    public List<EssayDTO> getEssayTmpBySeq(int seq) {
        return sqlSession.selectList("essaySQL.getEssayTmpBySeq", seq);
    }

    @Override
    public String deleteImage(int rno) {
        String imagename = sqlSession.selectOne("essaySQL.getImageName", rno);
        sqlSession.delete("essaySQL.deleteImage", rno);
        return imagename;
    }

    @Override
    public String delete(int rno) {
        String filename = sqlSession.selectOne("essaySQL.getFilepath", rno);
        sqlSession.delete("essaySQL.delete", rno);
        return filename;
    }

}
