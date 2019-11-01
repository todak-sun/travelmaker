package com.travelmaker.essay.dao;

import com.travelmaker.essay.domain.EssayDTO;

import java.util.List;

public interface EssayDAO {
    public List<EssayDTO> getAll();

    public EssayDTO getOne(int rno);

    public int create(EssayDTO essayDTO);
}
