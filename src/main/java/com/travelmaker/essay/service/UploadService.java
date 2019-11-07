package com.travelmaker.essay.service;

import com.travelmaker.essay.domain.EssayImageDTO;
import org.springframework.stereotype.Service;

@Service
public interface UploadService {
    String saveImage(EssayImageDTO essayImageDTO);

    void deleteImage(int rno);
}
