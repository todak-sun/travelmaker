package com.travelmaker.essay.ifs;

import com.travelmaker.essay.domain.EssayDTO;

public interface EssayPageInterface {
    EssayDTO readOne(int rno);
}
