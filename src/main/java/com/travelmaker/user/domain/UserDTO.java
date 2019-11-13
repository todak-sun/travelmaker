package com.travelmaker.user.domain;

import java.sql.Date;

import lombok.Data;

@Data
public class UserDTO {
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
}
