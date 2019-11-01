package com.travelmaker.essay.service;

import com.travelmaker.essay.dao.EssayDAO;
import com.travelmaker.essay.domain.EssayDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service(value = "essayService")
public class EssayServiceImpl implements EssayService {

    @Autowired
    EssayDAO essayDAO;

    public List<EssayDTO> getEssay() {
        return essayDAO.getAll();
    }

    @Override
    public EssayDTO getEssayOne(int rno) {
        return essayDAO.getOne(rno);
    }

    @Override
    public int createEssay(EssayDTO essayDTO) {
        return essayDAO.create(essayDTO);
    }
}
