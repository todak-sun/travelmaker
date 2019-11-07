package com.travelmaker.essay.service;

import com.travelmaker.essay.dao.EssayDAO;
import com.travelmaker.essay.domain.EssayImageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;

@Service(value = "uploadService")
public class UploadServiceImpl implements UploadService{

    @Autowired
    EssayDAO essayDAO;

    @Autowired
    ServletContext servletContext;

    public String saveImage(EssayImageDTO essayImageDTO){
        String savedName = LocalDateTime.now().toString() +  essayImageDTO.getFile().getOriginalFilename();
        int rno = essayImageDTO.getRno();
        String realpath = servletContext.getRealPath("/resources/storage/essay");

        System.out.println("savedName: " + savedName);
        System.out.println("rno: " + rno);
        System.out.println("realpath: " + realpath);

        essayImageDTO.setImagename(savedName);
        System.out.println("essayImageDTO's imagepath : " + essayImageDTO.getImagename());

        try {
            FileCopyUtils.copy(essayImageDTO.getFile().getInputStream(), new FileOutputStream(new File(realpath, savedName), true));
        } catch (IOException e) {
            e.printStackTrace();
        }
        int result = essayDAO.saveImage(essayImageDTO);

        return result == 1 ? essayImageDTO.getImagename() : null;
    }

    @Override
    public void deleteImage(int rno) {
        String imagename = essayDAO.deleteImage(rno);

        if(imagename != null) {
            File file = new File(servletContext.getRealPath("/resources/storage/essay"), imagename);
            if (file.exists()) {
                file.delete();
            }
        }
    }

}
