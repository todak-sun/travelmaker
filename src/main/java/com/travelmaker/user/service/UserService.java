package com.travelmaker.user.service;

import com.travelmaker.user.domain.UserDTO;

public interface UserService {
	public void userRegister(UserDTO userDTO);
	public UserDTO checkID(String id, String registerMethod);
	public UserDTO registerMethod(String name, String id, String registerMethod);
	public UserDTO checkPassword(String id, String pwd, String registerMethod);
	public void userModify(UserDTO userDTO);
	public void userWithdrawal(String id, String registerMethod);
	public UserDTO getUserDTO(int seq);
}
