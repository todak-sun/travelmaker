package com.travelmaker.user.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.travelmaker.user.domain.UserDTO;

@Repository
@Transactional
public class UserDAOImpl implements UserDAO {
	
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public UserDTO getUserByID(UserDTO userDTO) {
		return sqlSession.selectOne("userSQL.getUserByID", userDTO);
	}

	@Override
	public void UserInsert(UserDTO userDTO) {
		sqlSession.insert("userSQL.UserInsert", userDTO);
	}
	
	@Override
	public UserDTO checkMethod(UserDTO userDTO) {
		return sqlSession.selectOne("userSQL.checkMethod", userDTO);
	}

	@Override
	public UserDTO checkPassword(UserDTO userDTO) {
		return sqlSession.selectOne("userSQL.checkPassword", userDTO);
	}


	@Override
	public void userModify(UserDTO userDTO) {
		sqlSession.update("userSQL.userModify", userDTO);
	}

	public void userWithdrawal(UserDTO userDTO) {
		sqlSession.delete("userSQL.userWithdrawal",userDTO);
	}

	@Override
	public UserDTO getUserDTO(int seq) {
		return sqlSession.selectOne("userSQL.getUserDTO", seq);
	}

	@Override
	public UserDTO getUserNickname(String nickname) {
		return sqlSession.selectOne("userSQL.getUserNickname",nickname);
	}
	
	
}
