package com.travelmaker.essay.service;

import com.travelmaker.comment.dao.CommentDAO;
import com.travelmaker.essay.dao.EssayDAO;
import com.travelmaker.essay.domain.EssayDTO;
import com.travelmaker.essay.domain.EssaySearchFilter;
import com.travelmaker.essay.ifs.EssayApiInterface;
import com.travelmaker.model.network.Header;
import com.travelmaker.essay.domain.network.request.EssayApiRequest;
import com.travelmaker.essay.domain.network.response.EssayApiResponse;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Log
@Service
public class EssayApiService implements EssayApiInterface<EssayApiRequest, EssayApiResponse> {

    @Autowired
    EssayDAO essayDAO;

    @Autowired
    CommentDAO commentDAO;

    @Autowired
    ServletContext servletContext;

    @Override
    public Header<List<EssayApiResponse>> readAll() {
        return null;
    }

    @Override
    public Header<List<EssayApiResponse>> readAll(@ModelAttribute EssaySearchFilter essaySearchFilter) {
        return Optional.ofNullable(essayDAO.readAll(essaySearchFilter))
                .map(this::response)
                .orElse(null);
    }

    @Override
    public Header<EssayApiResponse> readOne(int rno) {
        Optional<EssayDTO> optional = Optional.ofNullable(essayDAO.readOne(rno));
        return optional.map(essayDTO -> {
            essayDTO.setContent(readFile(essayDTO.getFileName()));
            Optional.ofNullable(commentDAO.readAll(essayDTO.getBno()))
                    .ifPresent(essayDTO::setCommentDTOList);
            return response(essayDTO);
        }).orElseGet(() -> Header.ERROR("존재하지 않는 에세이입니다."));
    }

    @Override
    public Header<EssayApiResponse> create(Header<EssayApiRequest> request) {
        EssayApiRequest data = request.getData();
        String fileName = UUID.randomUUID().toString() + LocalDateTime.now().toString() + ".txt";
        saveFile(data.getContent(), fileName);

        EssayDTO essayDTO = EssayDTO.builder()
                .seq(data.getSeq())
                .title(data.getTitle())
                .fileName(fileName)
                .isDomestic(data.getIsDomestic())
                .build();
        EssayDTO newEssayDTO = essayDAO.create(essayDTO);

        return response(newEssayDTO);
    }

    @Override
    public String upload(int rno, EssayApiRequest request) {
        return Optional.ofNullable(essayDAO.readOne(rno))
                .map((essayDTO) -> {
                    Optional.ofNullable(essayDTO.getImageName()).ifPresent(this::deleteImage);
                    String imageName = Optional.ofNullable(request.getImageFile())
                            .map(this::saveImage)
                            .orElse(null);
                    essayDTO.setImageName(imageName);
                    return essayDAO.update(essayDTO).getImageName();
                })
                .orElse("");
    }

    @Override
    public Header<EssayApiResponse> update(Header<EssayApiRequest> request) {
        EssayApiRequest data = request.getData();
        Optional<EssayDTO> optional = Optional.ofNullable(essayDAO.readOne(data.getRno()));
        return optional.map(essayDTO -> {
            saveFile(data.getContent(), essayDTO.getFileName());

            essayDTO.setTitle(data.getTitle())
                    .setLikes(data.getLikes())
                    .setViews(data.getViews())
                    .setHashtag(data.getHashtag())
                    .setFixed(data.getFixed())
                    .setIsDomestic(data.getIsDomestic());
            return essayDAO.update(essayDTO);
        })
                .map(this::response)
                .orElseGet(() -> Header.ERROR("존재하지 않는 에세이입니다."));
    }


    @Override
    public Header delete(int rno) {
        Optional<EssayDTO> optional = Optional.ofNullable(essayDAO.readOne(rno));
        return optional.map(essayDTO -> {
            //파일 이름이 있다면, 해당 파일 삭제.
            Optional.ofNullable(essayDTO.getFileName()).ifPresent(this::deleteFile);
            //이미지 이름이 있다면, 해당 이미지 삭제
            Optional.ofNullable(essayDTO.getImageName()).ifPresent(this::deleteImage);
            //해당 게시물에 달린 댓글이 있다면, 댓글 모두 삭제
            Optional.of(commentDAO.readAll(essayDTO.getBno()))
                    .ifPresent((essayDTOList) -> commentDAO.deleteAll(essayDTO.getBno()));
            //게시글 삭제
            essayDAO.delete(rno);
            return Header.OK("삭제 성공");
        }).orElseGet(() -> Header.ERROR("존재하지 않는 에세이입니다."));
    }


    private Header<EssayApiResponse> response(EssayDTO essayDTO) {
        EssayApiResponse essayApiResponse = EssayApiResponse.builder()
                .bno(essayDTO.getBno())
                .rno(essayDTO.getRno())
                .seq(essayDTO.getSeq())
                .title(essayDTO.getTitle())
                .likes(essayDTO.getLikes())
                .views(essayDTO.getLikes())
                .hashtag(essayDTO.getHashtag())
                .dateWrite(essayDTO.getDateWrite())
                .dateUpdate(essayDTO.getDateUpdate())
                .content(essayDTO.getContent())
                .fixed(essayDTO.getFixed())
                .isDomestic(essayDTO.getIsDomestic())
                .build();
        return Header.OK(essayApiResponse, "데이터 조회 성공.");
    }

    private Header<List<EssayApiResponse>> response(List<EssayDTO> essayDTOList) {
        List<EssayApiResponse> essayApiResponseList = new ArrayList<EssayApiResponse>();
        essayDTOList.forEach((essayDTO) -> {
            EssayApiResponse essayApiResponse = EssayApiResponse.builder()
                    .bno(essayDTO.getBno())
                    .rno(essayDTO.getRno())
                    .seq(essayDTO.getSeq())
                    .title(essayDTO.getTitle())
                    .likes(essayDTO.getLikes())
                    .views(essayDTO.getLikes())
                    .hashtag(essayDTO.getHashtag())
                    .dateWrite(essayDTO.getDateWrite())
                    .dateUpdate(essayDTO.getDateUpdate())
                    .content(essayDTO.getContent())
                    .fixed(essayDTO.getFixed())
                    .isDomestic(essayDTO.getIsDomestic())
                    .build();
            essayApiResponseList.add(essayApiResponse);
        });
        return Header.OK(essayApiResponseList, "데이터 조회 성공");
    }

    private String readFile(String fileName) {
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

    private void saveFile(String content, String fileName) {
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

    private String saveImage(MultipartFile imageFile) {
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

    private void deleteImage(String savedImageName) {
        String dirPath = servletContext.getRealPath("/resources/storage/essay");
        File file = new File(dirPath, savedImageName);
        file.delete();
    }

    private void deleteFile(String savedFileName) {
        String dirPath = servletContext.getRealPath("/resources/storage/essay");
        File file = new File(dirPath, savedFileName);
        file.delete();
    }

}