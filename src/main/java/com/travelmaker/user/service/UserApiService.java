package com.travelmaker.user.service;

import com.travelmaker.user.dao.UserDAO;
import com.travelmaker.user.domain.UserDTO;
import com.travelmaker.user.domain.network.UserApiRequest;
import com.travelmaker.util.fileIO.FileIO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import javax.servlet.ServletContext;
import java.util.Optional;

@Service
public class UserApiService {

    @Autowired
    UserDAO userDAO;

    @Autowired
    ServletContext servletContext;

    @Autowired
    FileIO fileIO;

    @Inject
    PasswordEncoder passwordEncoder;


    public UserDTO readOne(UserDTO userDTO) {
        return Optional.ofNullable(userDAO.getUserByID(userDTO))
                .orElse(null);
    }

    public UserDTO readOne(int seq){
        return Optional.ofNullable(userDAO.getUserDTO(seq))
                .orElse(null);
    }

    public String update(UserApiRequest userApiRequest){
        return Optional.ofNullable(userDAO.getUserDTO(userApiRequest.getSeq()))
                .map(userDTO -> {
                    //DB에 저장되어있는 프로필 이미지가 있는지 검사
                    String imgProfile = Optional.ofNullable(userDTO.getImgProfile())
                            //있다면
                            .map(savedImgProfile -> {
                                // 저장된 이미지의 이름과 요청받은 이미지의 이름이 같은지 비교 후 같다면
                                if(userApiRequest.getImgProfile().equals(savedImgProfile)){
                                    //원래 이미지 이름으로 그냥 사용.
                                    return savedImgProfile;
                                } else {
                                    //다르다면 원래 있던 이미지를 삭제
                                    fileIO.deleteImage(savedImgProfile);
                                    //새로들어온 이미지 파일을 저장하고 그 이미지의 이름을 리턴.
                                    return Optional.ofNullable(userApiRequest.getImageFile())
                                            .map(imageFile -> fileIO.saveImage(imageFile))
                                            .orElse(null);
                                }
                            })
                            //없다면
                            .orElse(Optional.ofNullable(userApiRequest.getImageFile())
                                    //이미지 파일이 있는지 검사해서 있다면 저장, 아니면 null리턴.
                                    .map(imageFile -> fileIO.saveImage(imageFile))
                                    .orElse(null));
                    userDTO.setId(userApiRequest.getId())
                            .setNickname(userApiRequest.getNickname())
                            .setRealname(userApiRequest.getRealname())
                            .setEmail1(userApiRequest.getEmail1())
                            .setEmail2(userApiRequest.getEmail2())
                            .setGender(userApiRequest.getGender())
                            .setPhone1(userApiRequest.getPhone1())
                            .setPhone2(userApiRequest.getPhone2())
                            .setPhone3(userApiRequest.getPhone3())
                            .setPostcode(userApiRequest.getPostcode())
                            .setAddr1(userApiRequest.getAddr1())
                            .setAddr2(userApiRequest.getAddr2())
                            .setContentProfile(userApiRequest.getContentProfile())
                            .setAccount(userApiRequest.getAccount())
                            .setRegisterMethod(userApiRequest.getRegisterMethod())
                            .setPassword(passwordEncoder.encode(userApiRequest.getPassword()))
                            .setImgProfile(imgProfile);
                    userDAO.userModify(userDTO);
                    return "ok";
                }).orElse("fail");
    }

    public String updatePassword(int seq, String npwd){
        return Optional.ofNullable(userDAO.getUserDTO(seq))
                .map(userDTO -> {
                    userDTO.setPassword(passwordEncoder.encode(npwd));
                    userDAO.userModify(userDTO);
                    return "OK";
                }).orElse("FAIL");
    }


}
