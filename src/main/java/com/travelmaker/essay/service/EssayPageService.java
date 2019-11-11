package com.travelmaker.essay.service;

import com.travelmaker.essay.dao.EssayDAO;
import com.travelmaker.essay.domain.EssayDTO;
import com.travelmaker.essay.ifs.EssayPageInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service(value = "essayPageService")
public class EssayPageService implements EssayPageInterface {

    @Autowired
    EssayDAO essayDAO;

    @Override
    public EssayDTO readOne(int rno) {
        return essayDAO.readOne(rno);
    }
}
