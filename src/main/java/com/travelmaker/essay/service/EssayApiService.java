package com.travelmaker.essay.service;

import com.travelmaker.comment.dao.CommentDAO;
import com.travelmaker.essay.dao.EssayDAO;
import com.travelmaker.essay.domain.EssayDTO;
import com.travelmaker.essay.domain.EssaySearchFilter;
import com.travelmaker.essay.domain.network.request.EssayApiRequest;
import com.travelmaker.essay.domain.network.response.EssayApiResponse;
import com.travelmaker.essay.ifs.EssayApiInterface;
import com.travelmaker.model.network.Header;
import com.travelmaker.user.dao.UserDAO;
import com.travelmaker.util.fileIO.FileIO;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    UserDAO userDAO;

    @Autowired
    FileIO fileIO;

    @Override
    public Header<List<EssayApiResponse>> readAll(EssaySearchFilter essaySearchFilter) {
        return Optional.ofNullable(essayDAO.readAll(essaySearchFilter))
                .map(this::response)
                .orElse(null);
    }

    @Override
    public Header<EssayApiResponse> readOne(int rno) {
        Optional<EssayDTO> optional = Optional.ofNullable(essayDAO.readOne(rno));
        String temp = "essayTxt";
        return optional.map(essayDTO -> {
            System.out.println(essayDTO.getImageName());
            essayDTO.setContent(fileIO.readFile(essayDTO.getFileName(), temp));
            Optional.ofNullable(commentDAO.readAll(essayDTO.getBno()))
                    .ifPresent(essayDTO::setCommentDTOList);
            return response(essayDTO);
        }).orElseGet(() -> Header.ERROR("존재하지 않는 에세이입니다."));
    }

    @Override
    public Header<EssayApiResponse> create(EssayApiRequest request) {
        System.out.println(request);
        String temp = "essay";
        String imageName = Optional.ofNullable(request.getImageFile())
                .map(imageFile -> fileIO.saveImage(imageFile, temp))
                .orElse(null);
        String fileName = UUID.randomUUID().toString() + ".txt";
        fileIO.saveFile(request.getContent(), fileName, "essayTxt");

        EssayDTO essayDTO = EssayDTO.builder()
                .seq(request.getSeq())
                .title(request.getTitle())
                .fileName(fileName)
                .imageName(imageName)
                .hashtag(request.getHashtag())
                .fixed(request.getFixed())
                .isDomestic(request.getIsDomestic())
                .build();
        EssayDTO newEssayDTO = essayDAO.create(essayDTO);

        return response(newEssayDTO);
    }

    @Override
    public String upload(int rno, EssayApiRequest request) {
        String temp = "essay";
        return Optional.ofNullable(essayDAO.readOne(rno))
                .map((essayDTO) -> {
                    Optional.ofNullable(essayDTO.getImageName()).ifPresent(imageName -> fileIO.deleteImage(imageName, temp));
                    String imageName = Optional.ofNullable(request.getImageFile())
                            .map((imageFile) -> fileIO.saveImage(imageFile, temp))
                            .orElse(null);
                    essayDTO.setImageName(imageName);
                    return essayDAO.update(essayDTO).getImageName();
                })
                .orElse("");
    }

    @Override
    public Header<EssayApiResponse> update(int rno, EssayApiRequest request) {
        EssayDTO essayDTO = essayDAO.readOne(rno);
        String temp = "essay";
        String fileName = null;
        String imageName = null;

        if(essayDTO.getImageName() != null && request.getImageFile() != null) {
            String[] imageNameList = essayDTO.getImageName().split("/");

            fileIO.deleteImage(imageNameList[4], temp);
            imageName = fileIO.saveImage(request.getImageFile(), temp);
            essayDTO.setImageName(imageName);
        } else if(essayDTO.getImageName() == null && request.getImageFile() != null) {
            imageName = fileIO.saveImage(request.getImageFile(), temp);
            essayDTO.setImageName(imageName);
        }
        if(essayDTO.getContent() != null && request.getContent() != null) {
            fileIO.deleteFile(essayDTO.getFileName(), "essayTxt");
            fileName = fileIO.saveFile(request.getContent(), essayDTO.getFileName(), "essayTxt");
            essayDTO.setFileName(fileName);
        } else if(essayDTO.getContent() == null && request.getContent() != null) {
            fileName = fileIO.saveFile(request.getContent(), essayDTO.getFileName(), "essayTxt");
            essayDTO.setFileName(fileName);
        }

        //String fileName = fileIO.saveFile(request.getContent(), essayDTO.getFileName(), "essayTxt");
        //String imageName = fileIO.saveImage(request.getImageFile(), temp);

        essayDTO.setTitle(request.getTitle())
                .setLikes(request.getLikes())
                .setViews(request.getViews())
                .setHashtag(request.getHashtag())
                .setFixed(request.getFixed())
                .setIsDomestic(request.getIsDomestic());

        return response(essayDAO.update(essayDTO));
    }


    @Override
    public Header delete(int rno) {
        EssayDTO essayDTO = essayDAO.readOne(rno);
        String temp = "essay";

        if (essayDTO.getFileName() != null) {
            fileIO.deleteFile(essayDTO.getFileName(), "essayTxt");
        }
        if (essayDTO.getImageName() != null) {
            String[] imageNameList = essayDTO.getImageName().split("/");
            fileIO.deleteImage(imageNameList[4], temp);
        }

        essayDAO.delete(rno);
        return Header.OK("삭제 성공");
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
                .imageName(essayDTO.getImageName())
                .dateWrite(essayDTO.getDateWrite())
                .dateUpdate(essayDTO.getDateUpdate())
                .content(essayDTO.getContent())
                .fixed(essayDTO.getFixed())
                .isDomestic(essayDTO.getIsDomestic())
                .userDTO(userDAO.getUserDTO(essayDTO.getSeq()))
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
                    .fileName(essayDTO.getFileName())
                    .views(essayDTO.getLikes())
                    .imageName(essayDTO.getImageName())
                    .hashtag(essayDTO.getHashtag())
                    .dateWrite(essayDTO.getDateWrite())
                    .dateUpdate(essayDTO.getDateUpdate())
                    .content(essayDTO.getContent())
                    .fixed(essayDTO.getFixed())
                    .isDomestic(essayDTO.getIsDomestic())
                    .userDTO(userDAO.getUserDTO(essayDTO.getSeq()))
                    .build();
            essayApiResponseList.add(essayApiResponse);
        });
        return Header.OK(essayApiResponseList, "데이터 조회 성공");
    }
}
