package com.travelmaker.user.service;

import com.travelmaker.user.dao.UserDAO;
import com.travelmaker.user.domain.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Service
public class UserApiService {

    @Autowired
    UserDAO userDAO;

    public UserDTO readOne(@RequestBody UserDTO userDTO) {
        return Optional.ofNullable(userDAO.getUserByID(userDTO))
                .orElse(null);
    }

}
