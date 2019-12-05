package com.travelmaker.cash.controller;

import com.travelmaker.cash.domain.CashDTO;
import com.travelmaker.cash.service.CashService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/cash")
public class CashApiController {

    @Autowired
    private CashService cashService;

    @GetMapping(path="/{seq}", produces = "application/json; charset=UTF8")
    public ResponseEntity<List<CashDTO>> readAllBySeq(@PathVariable int seq){
        return cashService.readAllBySeq(seq);
    }

    @GetMapping(path="", produces = "application/json; charset=UTF8")
    public ResponseEntity<List<CashDTO>> readAll(@ModelAttribute CashDTO cashDTO){
        System.out.println(cashDTO.toString());
        return cashService.readAll(cashDTO);
    }

    @PostMapping(path = "", produces = "application/json; charset=UTF8")
    public ResponseEntity<String> create(@RequestBody CashDTO cashDTO) {
        return cashService.create(cashDTO);
    }

    @PutMapping(path="", produces = "application/json; charset=UTF8")
    public ResponseEntity<String> update(@RequestBody CashDTO cashDTO) {
        return cashService.update(cashDTO);
    }

    @DeleteMapping(path = "/{cno}", produces = "application/json; charset=UTF8")
    public ResponseEntity<String> delete(@PathVariable int cno){
        return cashService.delete(cno);
    }

    @PostMapping(path = "/cashRequest", produces = "application/json; charset=UTF8")
    public void cashReqeust(@RequestBody CashDTO cashDTO) {
        if (cashDTO.getApplyNum().compareTo("") == 0) {
            cashDTO.setApplyNum("none");
        }
        cashService.cashRegister(cashDTO);
        System.out.println(cashDTO.toString());
    }


}