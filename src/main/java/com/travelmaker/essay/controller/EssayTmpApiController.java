package com.travelmaker.essay.controller;

import com.travelmaker.essay.domain.EssayDTO;
import com.travelmaker.essay.service.EssayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/essaytmp")
public class EssayTmpApiController {

    @Autowired
    private EssayService essayService;

    @GetMapping(value = "/{seq}", produces = "application/json; UTF-8")
    public List<EssayDTO> read(@PathVariable int seq){
        return  essayService.getEssayTmpBySeq(seq);
    }
}
