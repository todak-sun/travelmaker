package com.travelmaker.user.dao;

import com.travelmaker.user.domain.UserDTO;

import java.util.List;

public interface UserDAO {
	public UserDTO getUserByID(UserDTO userDTO);
	public void UserInsert(UserDTO userDTO);
	public UserDTO checkMethod(UserDTO userDTO);
	public UserDTO checkPassword(UserDTO userDTO);
	public void userModify(UserDTO userDTO);
	public void userWithdrawal(UserDTO userDTO);
	public UserDTO getUserDTO(int seq);
	public UserDTO getUserNickname(String nickname);
	public List<UserDTO> userIdFind(String realname, String email1, String email2);
	public UserDTO userPwFind(String id, String email1, String email2);
	public void setPassword(UserDTO userDTO);
}
