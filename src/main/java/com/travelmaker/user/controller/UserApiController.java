package com.travelmaker.user.controller;

import com.travelmaker.user.domain.UserDTO;
import com.travelmaker.user.service.UserApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserApiController {

    @Autowired
    UserApiService userApiService;

    @PostMapping(path = "", produces = "application/json; charset=UTF-8")
    public UserDTO readOne(@RequestBody UserDTO userDTO) {
        return userApiService.readOne(userDTO);
    }

}
