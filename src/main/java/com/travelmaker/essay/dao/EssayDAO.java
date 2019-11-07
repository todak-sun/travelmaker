package com.travelmaker.essay.dao;

import com.travelmaker.essay.domain.EssayDTO;
import com.travelmaker.essay.domain.EssayImageDTO;

import java.util.List;

public interface EssayDAO {
    List<EssayDTO> getAll();

    EssayDTO getOne(int rno);

    int saveEssayTmp(EssayDTO essayDTO);

    int saveImage(EssayImageDTO essayImageDTO);

    int saveEssay(EssayDTO essayDTO);

    List<EssayDTO> getEssayTmpBySeq(int seq);

    String deleteImage(int rno);

    String delete(int rno);
}
