package com.travelmaker.cash.service;

import com.travelmaker.cash.dao.CashDAO;
import com.travelmaker.cash.domain.CashDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CashServiceImpl implements CashService {

    @Autowired
    private CashDAO cashDAO;

    @Override
    public void cashRegister(CashDTO cashDTO) {
        cashDAO.cashRegister(cashDTO);
    }

    @Override
    public ResponseEntity<String> create(CashDTO cashDTO) {
        int result = cashDAO.create(cashDTO);
        if (result == 1) {
            return new ResponseEntity<>("ok", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<List<CashDTO>> readAllBySeq(int seq) {
        return Optional.ofNullable(cashDAO.readAllBySeq(seq))
                .map(cashDTOList -> new ResponseEntity<>(cashDTOList, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<List<CashDTO>> readAll(CashDTO cashDTO) {
        return Optional.ofNullable(cashDAO.readAll(cashDTO))
                .map(cashDTOList -> new ResponseEntity<>(cashDTOList, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<String> update(CashDTO cashDTO) {
        int result = cashDAO.update(cashDTO);
        if (result == 1) {
            return new ResponseEntity<>("ok", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<String> delete(int cno) {
        int result = cashDAO.delete(cno);
        if (result == 1) {
            return new ResponseEntity<>("ok", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
        }
    }


}