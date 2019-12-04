
package com.travelmaker.cash.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.travelmaker.cash.domain.CashDTO;

import java.util.List;

@Repository
public class CashDAOImpl implements CashDAO {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public void cashRegister(CashDTO cashDTO) {
        sqlSession.insert("cashSQL.registerCash", cashDTO);
    }

    @Override
    public int create(CashDTO cashDTO) {
        return sqlSession.insert("cashSQL.create", cashDTO);
    }

    @Override
    public List<CashDTO> readAllBySeq(int seq) {
        return sqlSession.selectList("cashSQL.readAllBySeq", seq);
    }

    @Override
    public int update(CashDTO cashDTO) {
        return sqlSession.update("cashSQL.update", cashDTO);
    }

}