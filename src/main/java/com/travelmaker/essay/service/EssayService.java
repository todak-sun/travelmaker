package com.travelmaker.essay.service;

import com.travelmaker.essay.domain.EssayDTO;

import java.util.List;

public interface EssayService {
    List<EssayDTO> getEssay();

    EssayDTO getEssayOne(int rno);

    int create(EssayDTO essayDTO);

    String update(EssayDTO essayDTO);

    List<EssayDTO> getEssayTmpBySeq(int seq);

    void delete(int rno);
}
