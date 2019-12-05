package com.travelmaker.cash.dao;

import com.travelmaker.cash.domain.CashDTO;

import java.util.List;

public interface CashDAO {

    public void cashRegister(CashDTO cashDTO);

    int create(CashDTO cashDTO);

    List<CashDTO> readAllBySeq(int seq);

    CashDTO readOne(int prno);

    int update(CashDTO cashDTO);

    int delete(int cno);

    List<CashDTO> readAll(CashDTO cashDTO);

    CashDTO readOneByCno(int cno);
}