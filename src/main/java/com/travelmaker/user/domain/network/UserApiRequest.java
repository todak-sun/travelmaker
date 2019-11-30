package com.travelmaker.user.domain.network;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Accessors(chain = true)
public class UserApiRequest {
    private int seq;
    private String nickname; //별명
    private String realname; //실명
    private String id;
    private String email1;
    private String email2;
    private String password;
    private int grade;
    private int gender;
    private Date birthdate;
    private String postcode;
    private String addr1;
    private String addr2;
    private String phone1;
    private String phone2;
    private String phone3;
    private int agreeNeed;
    private int agreeOption;
    private Date dateRegist;
    private String registerMethod;
    private String imgProfile;
    private String contentProfile;
    private int warn;
    private String account;

    MultipartFile imageFile;
}
