package com.travelmaker.cash.service;

import com.travelmaker.cash.domain.CashDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CashService {

    public void cashRegister(CashDTO cashDTO);

    ResponseEntity<String> create(CashDTO cashDTO);

    ResponseEntity<List<CashDTO>> readAllBySeq(int seq);

    ResponseEntity<List<CashDTO>> readAll(CashDTO cashDTO);

    ResponseEntity<String> update(CashDTO cashDTO);

    ResponseEntity<String> delete(int cno);


}