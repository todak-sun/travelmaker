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
import org.springframework.web.bind.annotation.ModelAttribute;

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
    UserDAO userDAO;

    @Autowired
    FileIO fileIO;

    @Override
    public Header<List<EssayApiResponse>> readAll(@ModelAttribute EssaySearchFilter essaySearchFilter) {
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
    	
    	if(essayDTO.getImageName() != null) {
    		String[] imageName = essayDTO.getImageName().split("/");
    		System.out.println(imageName[4]);
    		fileIO.deleteImage(imageName[4], temp);
    	}
    	if(essayDTO.getContent() != null) {
    		fileIO.deleteFile(essayDTO.getFileName(), "essayTxt");
    	}
    	String fileName = fileIO.saveFile(request.getContent(), essayDTO.getFileName(), "essayTxt");
    	String imageName = fileIO.saveImage(request.getImageFile(), temp);
    	
    	essayDTO.setTitle(request.getTitle())
    				.setLikes(request.getLikes())
    				.setViews(request.getViews())
    				.setHashtag(request.getHashtag())
    				.setFixed(request.getFixed())
    				.setImageName(imageName)
    				.setIsDomestic(request.getIsDomestic())
    				.setFileName(fileName);
    	
    	return response(essayDAO.update(essayDTO));
    	
    	
//        Optional<EssayDTO> optional = Optional.ofNullable(essayDAO.readOne(rno));
//        String temp = "essay";
        
//        return optional.map(essayDTO -> {
//            //바뀐 내용을 기존에 있던 내용에 저장
//            fileIO.saveFile(request.getContent(), essayDTO.getFileName(), "essayTxt");
//
//            //DB에 저장된 image의 이름을 조회
//            String imageName = Optional.ofNullable(essayDTO.getImageName())
//                    //DB에 저장된 이미지가 있다면
//                    .map(savedImageName -> {
//                        //임시 수정중인 이미지의 이름과 같은지 비교해서 같다면 그대로 저장
//                        if (request.getImageName().equals(savedImageName)) {
//                            return savedImageName;
//                            //임시 수정중인 이미지의 이름과 같지 않다면 기존의 파일을 삭제하고, 새로 들어온 이미지 파일을 저장하거나 null로 처리
//                        } else {
//                            fileIO.deleteImage(savedImageName, temp);
//                            return Optional.ofNullable(request.getImageFile())
//                                    .map(imageFile -> fileIO.saveImage(imageFile, temp))
//                                    .orElse(null);
//                        }
//                    })
//                    //DB에 이미지가 없다면, 새로 들어온 배경이미지가 있는지 조사하고, 새로 들어온 이미지 파일을 저장하거나 null로 처리.
//                    .orElse(Optional.ofNullable(request.getImageFile())
//                            .map(imageFile -> fileIO.saveImage(imageFile, temp))
//                            .orElse(null));
//
//            essayDTO.setTitle(request.getTitle())
//                    .setLikes(request.getLikes())
//                    .setViews(request.getViews())
//                    .setHashtag(request.getHashtag())
//                    .setFixed(request.getFixed())
//                    .setImageName(imageName)
//                    .setIsDomestic(request.getIsDomestic());
//            return essayDAO.update(essayDTO);
//        })
//                .map(this::response)
//                .orElseGet(() -> Header.ERROR("존재하지 않는 에세이입니다."));
    }


    @Override
    public Header delete(int rno) {
        Optional<EssayDTO> optional = Optional.ofNullable(essayDAO.readOne(rno));
        String temp = "essay";
        return optional.map(essayDTO -> {
            //파일 이름이 있다면, 해당 파일 삭제.
            Optional.ofNullable(essayDTO.getFileName()).ifPresent(fileName -> fileIO.deleteFile(fileName, "essayTxt"));
            //이미지 이름이 있다면, 해당 이미지 삭제
            Optional.ofNullable(essayDTO.getImageName()).ifPresent(imageName -> fileIO.deleteImage(imageName, temp));
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
