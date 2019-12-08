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

    public UserDTO readOne(int seq) {
        return Optional.ofNullable(userDAO.getUserDTO(seq))
                .orElse(null);
    }

    public String update(UserApiRequest userApiRequest) {
        UserDTO userDTO = userDAO.getUserDTO(userApiRequest.getSeq());
        String temp = "profile";
        String imgProfile = null;

        if (userDTO.getImgProfile() != null && userApiRequest.getImageFile() != null) {
            String[] imageName = userDTO.getImgProfile().split("/");
            fileIO.deleteImage(imageName[4], temp);
            imgProfile = fileIO.saveImage(userApiRequest.getImageFile(), temp);
            userDTO.setImgProfile(imgProfile);
        } else if (userDTO.getImgProfile() == null && userApiRequest.getImageFile() != null) {
            imgProfile = fileIO.saveImage(userApiRequest.getImageFile(), temp);
            userDTO.setImgProfile(imgProfile);
        }

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
                .setPassword(passwordEncoder.encode(userApiRequest.getPassword()));

        userDAO.userModify(userDTO);

        return imgProfile;
    }

    public String updatePassword(int seq, String npwd) {
        return Optional.ofNullable(userDAO.getUserDTO(seq))
                .map(userDTO -> {
                    userDTO.setPassword(passwordEncoder.encode(npwd));
                    userDAO.userModify(userDTO);
                    return "OK";
                }).orElse("FAIL");
    }


}
