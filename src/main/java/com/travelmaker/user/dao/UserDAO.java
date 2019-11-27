package com.travelmaker.user.dao;

import com.travelmaker.user.domain.UserDTO;

public interface UserDAO {
	public UserDTO getUserByID(UserDTO userDTO);
	public void UserInsert(UserDTO userDTO);
	public UserDTO checkMethod(UserDTO userDTO);
	public UserDTO checkPassword(UserDTO userDTO);
	public void userModify(UserDTO userDTO);
	public void userWithdrawal(UserDTO userDTO);
	public UserDTO getUserDTO(int seq);
	public UserDTO getUserNickname(String nickname);
}
