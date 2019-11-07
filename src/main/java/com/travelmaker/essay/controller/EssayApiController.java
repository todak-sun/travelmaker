package com.travelmaker.essay.controller;

import com.travelmaker.essay.domain.EssayDTO;
import com.travelmaker.essay.service.EssayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/essay")
public class EssayApiController {

    @Autowired
    EssayService essayService;


    @GetMapping(path = "", produces = "application/json; charset=UTF-8")
    public List<EssayDTO> essay() {
        return essayService.getEssay();
    }

    @PostMapping(path = "", produces = "application/json; charset=UTF-8")
    public String create(@RequestBody EssayDTO essayDTO) {
        return "" + essayService.create(essayDTO);
    }

    @PutMapping(path = "", produces = "application/json; charset=UTF-8")
    public String update(@RequestBody EssayDTO essayDTO) {
        return essayService.update(essayDTO);
    }

    @GetMapping(path = "/{rno}", produces = "application/json; charset=UTF-8")
    public EssayDTO read(@PathVariable int rno) {
        return essayService.getEssayOne(rno);
    }

    @DeleteMapping(path = "/{rno}", produces = "application/json; charset=UTF-8")
    public void delete(@PathVariable int rno) {
        essayService.delete(rno);
    }
}
