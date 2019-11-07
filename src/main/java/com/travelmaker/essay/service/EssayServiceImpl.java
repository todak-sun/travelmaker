package com.travelmaker.essay.service;

import com.travelmaker.essay.dao.EssayDAO;
import com.travelmaker.essay.domain.EssayDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.ServletContext;
import java.io.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service(value = "essayService")
public class EssayServiceImpl implements EssayService {

    @Autowired
    EssayDAO essayDAO;

    @Autowired
    ServletContext servletContext;

    public List<EssayDTO> getEssay() {
        return essayDAO.getAll();
    }

    @Override
    public EssayDTO getEssayOne(int rno) {
        return essayDAO.getOne(rno);
    }

    @Override
    public List<EssayDTO> getEssayTmpBySeq(int seq) {
        return essayDAO.getEssayTmpBySeq(seq);
    }

    @Override
    public int create(EssayDTO essayDTO)  {

        String filename = UUID.randomUUID().toString() + LocalDateTime.now().toString() + ".txt";
        writeFile(essayDTO, filename);
        essayDTO.setFilepath(filename);
        return essayDAO.saveEssayTmp(essayDTO);
    }

    @Override
    public String update(EssayDTO essayDTO) {
        EssayDTO savedEssayDTO = essayDAO.getOne(essayDTO.getRno());
        savedEssayDTO.setTitle(essayDTO.getTitle())
                    .setHashtag(essayDTO.getHashtag())
                    .setFixed(essayDTO.getFixed());

        String filepath = savedEssayDTO.getFilepath();
        System.out.println("rno로 조회한 파일패스 : " + filepath);
        writeFile(essayDTO, filepath);
        int result = essayDAO.saveEssay(savedEssayDTO);

        return result == 1 ? "OK" : "ERROR";
    }

    @Override
    public void delete(int rno) {
        String dirPath = servletContext.getRealPath("/resources/storage/essay");

        String filepath = essayDAO.delete(rno);
        if(filepath != null){
            File file = new File(dirPath, filepath);
            if(file.exists()){
                file.delete();
            }
        }

        String imagename = essayDAO.deleteImage(rno);
        if(imagename != null) {
            File file = new File(dirPath, imagename);
            if (file.exists()) {
                file.delete();
            }
        }

        essayDAO.delete(rno);
    }

    private void writeFile(EssayDTO essayDTO, String filepath){
        String dirpath = servletContext.getRealPath("/resources/storage/essay");
        OutputStreamWriter osw = null;
        String content = essayDTO.getContent();
        try {
            osw = new OutputStreamWriter(new FileOutputStream(dirpath + "/" +filepath));
            osw.write(content);
            osw.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally{
            if(osw != null) {
                try {
                    osw.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

}
