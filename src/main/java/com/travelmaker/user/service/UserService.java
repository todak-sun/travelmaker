package com.travelmaker.user.service;

import com.travelmaker.user.domain.UserDTO;

import java.util.List;

public interface UserService {
	public void userRegister(UserDTO userDTO);
	public UserDTO checkID(String id, String registerMethod);
	public UserDTO registerMethod(String name, String id, String registerMethod);
	public UserDTO checkPassword(String id, String pwd, String registerMethod);
	public void userModify(UserDTO userDTO);
	public void userWithdrawal(String id, String registerMethod);
	public UserDTO getUserDTO(int seq);
	public UserDTO checkNickname(String nickname);
	public List<String> userIdFind(String realname, String email1, String email2);
	public UserDTO userPwFind(String id, String email1, String email2);
	public void setPassword(UserDTO userDTO);
}
