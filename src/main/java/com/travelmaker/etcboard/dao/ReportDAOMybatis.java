package com.travelmaker.etcboard.dao;

import com.travelmaker.etcboard.domain.ReportDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("reportDAO")
public class ReportDAOMybatis implements ReportDAO{

    @Autowired
    SqlSession sqlSession;

    @Override
    public ReportDTO readOne(int reno) {
        return sqlSession.selectOne("reportSQL.readOne", reno);
    }

    @Override
    public List<ReportDTO> readAll() {
        return sqlSession.selectList("reportSQL.readAll");
    }

    @Override
    public ReportDTO create(ReportDTO reportDTO) {
        sqlSession.insert("reportSQL.create", reportDTO);
        return sqlSession.selectOne("reportSQL.readOne", reportDTO.getReno());
    }

    @Override
    public ReportDTO update(ReportDTO reportDTO) {
        sqlSession.update("reportSQL.update", reportDTO);
        return sqlSession.selectOne("reportSQL.readOne", reportDTO.getReno());
    }

    @Override
    public void delete(int reno) {
        sqlSession.delete("reportSQL.delete", reno);
    }
}
