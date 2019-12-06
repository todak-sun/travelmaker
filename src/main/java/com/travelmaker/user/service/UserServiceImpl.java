package com.travelmaker.user.service;

import com.travelmaker.user.dao.UserDAOImpl;
import com.travelmaker.user.domain.UserDTO;
import com.travelmaker.user.domain.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class UserServiceImpl implements UserDetailsService, UserService {

    @Autowired
    UserDAOImpl userDAOImpl;

    @Inject
    PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                .getRequest();

        String originPwd = request.getParameter("pwd");
        //System.out.println("originPwd"+originPwd);


        String idArray[] = id.split("===");
        //System.out.println("[loadUserByUsername id" + id);
        UserDTO temp = new UserDTO();
        temp.setId(idArray[0]);
        temp.setRegisterMethod(idArray[1]);

        UserDTO userDTO = userDAOImpl.getUserByID(temp);

        if (userDTO == null) {
            throw new UsernameNotFoundException("No user found with id" + idArray[0]);
        }
        //System.out.println("[loadUserByUsername UserDTO :" + userDTO.toString() + "]");

        Collection<SimpleGrantedAuthority> roles = new ArrayList<SimpleGrantedAuthority>();

        if (userDTO.getId().equals("admin")) {
            roles.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        } else {
            roles.add(new SimpleGrantedAuthority("ROLE_USER"));
        }
        User user;

        //System.out.println("인코딩 PW"+passwordEncoder.encode(originPwd));

        if (passwordEncoder.matches(originPwd, userDTO.getPassword())) { //일반로그인
            //System.out.println("[[[결과]]"+passwordEncoder.matches(originPwd, userDTO.getPassword()));
            //System.out.println("일반로그인");
            user = new User(idArray[0] + "%" + userDTO.getRegisterMethod(), originPwd, roles);
            //System.out.println("DB : "+userDTO.getPassword());
        } else {
            //System.out.println("[[[결과]]"+passwordEncoder.matches(originPwd, userDTO.getPassword()));
            //System.out.println(userDTO.getPassword());
            //비밀번호가 틀리거나, API로그인
            user = new User(idArray[0] + "%" + userDTO.getRegisterMethod(), userDTO.getPassword(), roles);
            //System.out.println("DB : "+userDTO.getPassword());
        }
        //System.out.println("user Password :" + user.getPassword());
        //System.out.println("[UserDetails user :" + user.toString() + "]");
        //System.out.println("[roles Size : " + roles.size() + "]");
        UserDetails userDetail = new UserDetails(user, userDTO);

        return userDetail;
    }

    @Override
    public void userRegister(UserDTO userDTO) {
        userDAOImpl.UserInsert(userDTO);
    }

    @Override
    public UserDTO checkID(String id, String registerMethod) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(id);
        userDTO.setRegisterMethod(registerMethod);
        return userDAOImpl.getUserByID(userDTO);
    }

    @Override
    public UserDTO registerMethod(String name, String id, String registerMethod) {

        UserDTO userDTO = new UserDTO();
        userDTO.setId(id);
        userDTO.setRealname(name);
        userDTO.setRegisterMethod(registerMethod);

        return userDAOImpl.checkMethod(userDTO);
    }

    @Override
    public UserDTO checkPassword(String id, String pwd, String registerMethod) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(id);
        userDTO.setPassword(pwd);
        userDTO.setRegisterMethod(registerMethod);

        return userDAOImpl.checkPassword(userDTO);
    }

    @Override
    public void userModify(UserDTO userDTO) {
        userDAOImpl.userModify(userDTO);
    }

    @Override
    public void userWithdrawal(String id, String registerMethod) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(id);
        userDTO.setRegisterMethod(registerMethod);
        userDAOImpl.userWithdrawal(userDTO);
    }

    @Override
    public UserDTO getUserDTO(int seq) {
        return userDAOImpl.getUserDTO(seq);
    }

    @Override
    public UserDTO checkNickname(String nickname) {
        return userDAOImpl.getUserNickname(nickname);
    }

    @Override
    public List<String> userIdFind(String realname, String email1, String email2) {
        List<String> idList = new ArrayList<>();
        List<UserDTO> userDTOList = userDAOImpl.userIdFind(realname, email1, email2);
        userDTOList.forEach(userDTO -> {
            StringBuffer sb = new StringBuffer(userDTO.getId());
            sb.replace(0, 2, "***");
            idList.add(sb.toString());
        });
        return idList;
    }

    @Override
    public UserDTO userPwFind(String id, String email1, String email2) {
        return userDAOImpl.userPwFind(id, email1, email2);
    }

    @Override
    public void setPassword(UserDTO userDTO) {
        userDAOImpl.setPassword(userDTO);
    }


}
