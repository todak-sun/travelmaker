package com.travelmaker.essay.service;

import com.travelmaker.essay.domain.EssayDTO;

import java.util.List;

public interface EssayService {
    public List<EssayDTO> getEssay();

    public EssayDTO getEssayOne(int rno);

    public int createEssay(EssayDTO essayDTO);
}
