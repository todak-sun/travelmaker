package com.travelmaker.user.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
	//DTO
	private String nickname;
	private String realname;
	private String email;
	private String email2;
	private String password;
	private Grade grade;
	private Gender gender;
	private String birthdate;
	private String postcode;
	private String addr1;
	private String addr2;
	private String phone;
	private int agreeNeed;
	private int agreeOption;
	private String dateRegist;
	private String imgProfile;
	private String contentProfile;
	private int warn;
	private String account;
}
