package com.travelmaker.cash.dao;

import com.travelmaker.cash.domain.CashDTO;

import java.util.List;

public interface CashDAO {

    public void cashRegister(CashDTO cashDTO);

    int create(CashDTO cashDTO);

    List<CashDTO> readAllBySeq(int seq);

    int update(CashDTO cashDTO);
}