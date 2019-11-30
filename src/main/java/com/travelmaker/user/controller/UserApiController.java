package com.travelmaker.user.controller;

import com.travelmaker.user.domain.UserDTO;
import com.travelmaker.user.domain.network.UserApiRequest;
import com.travelmaker.user.service.UserApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserApiController {

    @Autowired
    UserApiService userApiService;

    @PostMapping(path = "", produces = "application/json; charset=UTF-8")
    public UserDTO readOne(@RequestBody UserDTO userDTO) {
        return userApiService.readOne(userDTO);
    }

    @PostMapping(path = "/{seq}", produces = "application/json; charset=UTF-8")
    public UserDTO readOne(@PathVariable int seq) {
        return userApiService.readOne(seq);
    }

    @PostMapping(path = "/{seq}/update")
    public String update(@PathVariable int seq, @ModelAttribute UserApiRequest request) {
        return userApiService.update(request);
    }

    @PostMapping(path = "/{seq}/password")
    public String updatePassword(@PathVariable int seq, @RequestParam String npwd){
        System.out.println(npwd);
        return userApiService.updatePassword(seq, npwd);
    }

}
