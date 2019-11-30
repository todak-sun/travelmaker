package com.travelmaker.util.fileIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.*;
import java.time.LocalDateTime;

@Component
public class FileIO {

    @Autowired
    ServletContext servletContext;

    public String readFile(String fileName) {
        String dirPath = servletContext.getRealPath("/resources/storage/essay");
        BufferedReader br = null;
        StringBuffer sb = new StringBuffer();
        try {
            String line = null;
            br = new BufferedReader(new InputStreamReader(new FileInputStream(new File(dirPath, fileName))));
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return sb.toString();
    }

    public void saveFile(String content, String fileName) {
        String dirPath = servletContext.getRealPath("/resources/storage/essay");
        OutputStreamWriter osw = null;
        try {
            osw = new OutputStreamWriter(new FileOutputStream(dirPath + "/" + fileName));
            osw.write(content);
            osw.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (osw != null) {
                    osw.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public String saveImage(MultipartFile imageFile) {
        String dirPath = servletContext.getRealPath("/resources/storage/essay");
        String imageName = LocalDateTime.now().toString() + imageFile.getOriginalFilename();

        InputStream is = null;
        FileOutputStream fos = null;
        try {
            is = imageFile.getInputStream();
            fos = new FileOutputStream(new File(dirPath, imageName));
            FileCopyUtils.copy(is, fos);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (is != null) {
                    is.close();
                }
                if (fos != null) {
                    fos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return imageName;
    }

    public void deleteImage(String savedImageName) {
        String dirPath = servletContext.getRealPath("/resources/storage/essay");
        File file = new File(dirPath, savedImageName);
        file.delete();
    }

    public void deleteFile(String savedFileName) {
        String dirPath = servletContext.getRealPath("/resources/storage/essay");
        File file = new File(dirPath, savedFileName);
        file.delete();
    }

}
