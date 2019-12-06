package com.travelmaker.user.dao;

import com.travelmaker.user.domain.UserDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        sqlSession.delete("userSQL.userWithdrawal", userDTO);
    }

    @Override
    public UserDTO getUserDTO(int seq) {
        return sqlSession.selectOne("userSQL.getUserDTO", seq);
    }

    @Override
    public UserDTO getUserNickname(String nickname) {
        return sqlSession.selectOne("userSQL.getUserNickname", nickname);
    }

    @Override
    public List<UserDTO> userIdFind(String realname, String email1, String email2) {
        Map<String, String> map = new HashMap<String, String>();
        map.put("realname", realname);
        map.put("email1", email1);
        map.put("email2", email2);
        return sqlSession.selectList("userSQL.userIdFind", map);
    }

    @Override
    public UserDTO userPwFind(String id, String email1, String email2) {
        System.out.println("비밀번호찾자" + id + email1 + email2);
        Map<String, String> map = new HashMap<String, String>();
        map.put("id", id);
        map.put("email1", email1);
        map.put("email2", email2);
        return sqlSession.selectOne("userSQL.userPwFind", map);
    }

    @Override
    public void setPassword(UserDTO userDTO) {
        sqlSession.update("userSQL.setPassword", userDTO);
    }
}
