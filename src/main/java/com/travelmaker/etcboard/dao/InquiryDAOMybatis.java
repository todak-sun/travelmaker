package com.travelmaker.etcboard.dao;

import com.travelmaker.etcboard.domain.InquiryDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("inquiryDAO")
public class InquiryDAOMybatis implements InquiryDAO{

    @Autowired
    private SqlSession sqlSession;

    @Override
    public InquiryDTO readOne(int iqno) {
        return sqlSession.selectOne("inquirySQL.readOne", iqno);
    }

    @Override
    public List<InquiryDTO> readAll() {
        return sqlSession.selectList("inquirySQL.readAll");
    }

    @Override
    public InquiryDTO create(InquiryDTO inquiryDTO) {
        sqlSession.insert("inquirySQL.create", inquiryDTO);
        return sqlSession.selectOne("inquiry.readOne", inquiryDTO.getIqno());
    }

    @Override
    public InquiryDTO update(InquiryDTO inquiryDTO) {
        sqlSession.update("inquirySQL.update", inquiryDTO);
        return sqlSession.selectOne("inquirySQL.readOne", inquiryDTO.getIqno());
    }

    @Override
    public void delete(int iqno) {
        sqlSession.delete("inquirySQL.delete", iqno);
    }
}
