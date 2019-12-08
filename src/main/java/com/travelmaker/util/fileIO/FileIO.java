package com.travelmaker.util.fileIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

@Component
public class FileIO {

    @Autowired
    ServletContext servletContext;
    @Autowired
    UploadService uploadService;
    
    private static final String amazonURLPath = "https://travelmaker-buckets.s3.ap-northeast-2.amazonaws.com/";

    public String readFile(String fileName, String temp) {
    	return uploadService.downloadTxt(fileName, temp);
    	
//        String dirPath = servletContext.getRealPath("/resources/storage/essay");
//        BufferedReader br = null;
//        StringBuffer sb = new StringBuffer();
//        try {
//            String line = null;
//            br = new BufferedReader(new InputStreamReader(new FileInputStream(new File(dirPath, fileName))));
//            while ((line = br.readLine()) != null) {
//                sb.append(line);
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        } finally {
//            if (br != null) {
//                try {
//                    br.close();
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }
//        }
//        return sb.toString();
    }

    public String saveFile(String content, String fileName, String temp) {
        String dirPath = servletContext.getRealPath("/resources/img");
        File file = new File(dirPath + "/", fileName);
        
        try {
			FileOutputStream fos = new FileOutputStream(file);
			fos.write(content.getBytes());
			uploadService.uploadTxt(file, temp, fileName);
			fos.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        String fileUrl = amazonURLPath + temp + "/" + fileName;
        System.out.println("텍스트 파일 저장 들어옴");
        
        return fileUrl;
//        OutputStreamWriter osw = null;
//        try {
//            osw = new OutputStreamWriter(new FileOutputStream(file));
//            osw.write(content);
//            uploadService.uploadTxt(file, temp, fileName);
//            osw.flush();
//            
//            file.delete();
//        } catch (IOException e) {
//            e.printStackTrace();
//        } finally {
//            try {
//                if (osw != null) {
//                    osw.close();
//                }
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }
    }

    public String saveImage(MultipartFile imageFile, String temp) {
    	String imageName = uploadService.upload(imageFile, temp);
    	//String dirPath = servletContext.getRealPath("/resources/storage/essay");
        //String imageName = LocalDateTime.now().toString() + imageFile.getOriginalFilename();
    	String imageURL = amazonURLPath + temp + "/" + imageName;
    	System.out.println(imageFile.getOriginalFilename());

//        InputStream is = null;
//        FileOutputStream fos = null;
//        try {
//            is = imageFile.getInputStream();
//            fos = new FileOutputStream(new File(dirPath, imageName));
//            FileCopyUtils.copy(is, fos);
//        } catch (IOException e) {
//            e.printStackTrace();
//        } finally {
//            try {
//                if (is != null) {
//                    is.close();
//                }
//                if (fos != null) {
//                    fos.close();
//                }
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }
        return imageURL;
    }
    
    public void deleteImage(String savedImageName, String temp) {
    	uploadService.delete(savedImageName, temp);
//        String dirPath = servletContext.getRealPath("/resources/storage/essay");
//        File file = new File(dirPath, savedImageName);
//        file.delete();
    }

    public void deleteFile(String fileName, String temp) {
    	uploadService.delete(fileName, temp);
//        String dirPath = servletContext.getRealPath("/resources/storage/essay");
//        File file = new File(dirPath, savedFileName);
//        file.delete();
    }

}
