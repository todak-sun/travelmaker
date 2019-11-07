package com.travelmaker.essay.controller;

import com.travelmaker.essay.domain.EssayImageDTO;
import com.travelmaker.essay.service.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/upload")
public class UploadController {

    @Autowired
    UploadService uploadService;

    @PostMapping("/img")
    public String saveImage(@ModelAttribute EssayImageDTO essayImageDTO){
        return uploadService.saveImage(essayImageDTO);
    }

    @DeleteMapping("/img/{rno}")
    public void deleteImage(@PathVariable int rno){
        uploadService.deleteImage(rno);
    }

}
