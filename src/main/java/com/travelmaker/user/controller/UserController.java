package com.travelmaker.user.controller;

import com.travelmaker.user.domain.UserDTO;
import com.travelmaker.user.service.UserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class UserController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	@Inject
	PasswordEncoder passwordEncoder;

	@Autowired
	UserServiceImpl userServiceImpl;

	/* 로그인 실패 */
	@RequestMapping(value = "/loginFail", method = RequestMethod.GET)
	public String loginFail() {
		return "user/loginFail";
	}

	/* 회원가입 */
	@RequestMapping(value = "user/register", method = RequestMethod.POST)
	public ModelAndView userRegister(@ModelAttribute UserDTO userDTO, Model model) {
		/*
		 * System.out.println("[UserController - userRegister -useDTO:] " +
		 * userDTO.toString());
		 * System.out.println("[password : ]"+passwordEncoder.encode(userDTO.getPassword
		 * ()));
		 */
		userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		ModelAndView mav = new ModelAndView();
		userServiceImpl.userRegister(userDTO);
		mav.setViewName("user/registerOk");
		return mav;
	}

	/* 아이디 체크 */
	@RequestMapping(value = "user/checkId", method = RequestMethod.POST)
	@ResponseBody
	public String checkId(@RequestParam String id, @RequestParam String registerMethod) {
		/*
		 * System.out.println("[UserController -checkId id :]" + id);
		 * System.out.println("[UserController -checkId registerMethod :]" +
		 * registerMethod);
		 */
		UserDTO userDTO = userServiceImpl.checkID(id, registerMethod);
		if (userDTO == null) {
			return "not_exist";
		} else {
			// System.out.println(userDTO.toString());
			return "exist";
		}
	}

	/* 현재 비밀번호 체크 */
	@RequestMapping(value = "user/checkPassword", method = RequestMethod.POST)
	@ResponseBody
	public String checkPassword(@RequestParam String id, @RequestParam String registerMethod,
			@RequestParam String pwd) {
		
		/*
		 * System.out.println("[UserController -checkPassword id :]" + id);
		 * System.out.println("[UserController -checkPassword pwd :]" + pwd);
		 * System.out.println("[UserController -checkPassword registerMethod :]" +
		 * registerMethod);
		 */
		
//		UserDTO userDTO = userServiceImpl.checkPassword(id, pwd, registerMethod);
		UserDTO userDTO = userServiceImpl.checkID(id, registerMethod);
		if (userDTO == null) {
			//System.out.println("유저없음");
			return "not_exist";
		} else {
			//System.out.println("DB : "+userDTO.getPassword());
			//System.out.println();
			//System.out.println("[[[결과]]"+passwordEncoder.matches(pwd, userDTO.getPassword()));
			
			if(passwordEncoder.matches(pwd, userDTO.getPassword())){
				return "exist";
			}else {
				//System.out.println("패스워드 틀림");
				return "not_exist";
			}
			
		}
		
	}

	/* 카카오,네이버, 구글 ID Email 등록방식체크 */
	@RequestMapping(value = "user/registerMethod", method = RequestMethod.POST)
	@ResponseBody
	public String registerMethod(@RequestParam String name, @RequestParam String id,
			@RequestParam String registerMethod) {
		// System.out.println("[UserController -registerMethod name :]" +name +"[id
		// :"+id+"] [registerMethod :"+registerMethod+"]");
		UserDTO userDTO = userServiceImpl.registerMethod(name, id, registerMethod);
		if (userDTO == null) {
			return "null";
		} else {
			// System.out.println(userDTO.toString());
			return userDTO.getPassword();
		}
	}

	@RequestMapping(value = "user/naverLogin", method = RequestMethod.GET)
	public String naverLogin() {
		return "user/naverLoginCallback";
	}

	@RequestMapping(value = "user/mypage", method = RequestMethod.POST)
	public ModelAndView mypageForm(@RequestParam String id) {
		//System.out.println("[mypageForm id]" + id);
		String[] temp = id.split("%");
		UserDTO userDTO = userServiceImpl.checkID(temp[0], temp[1]);
		ModelAndView mav = new ModelAndView();
		mav.addObject("userDTO", userDTO);
		mav.setViewName("user/mypage");
		return mav;
	}

	@RequestMapping(value = "user/userModify", method = RequestMethod.POST)
	public ModelAndView mypageForm(@ModelAttribute UserDTO userDTO, Model model) {
		/*
		 * System.out.println(userDTO.toString());
		 * System.out.println(userDTO.getPhone1().length());
		 * System.out.println(userDTO.getPhone2().length());
		 * System.out.println(userDTO.getPhone3().length());
		 */
		
		userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		
		userServiceImpl.userModify(userDTO);
		ModelAndView mav = new ModelAndView();
		mav.setViewName("user/modifyOK");
		return mav;
	}

	@RequestMapping(value = "user/withdrawal", method = RequestMethod.POST)
	public String userWithdrawal(@RequestParam String id, @RequestParam String registerMethod, HttpSession session,
			HttpServletRequest request) {
		//System.out.println(id + " " + registerMethod);
		userServiceImpl.userWithdrawal(id, registerMethod);
		return "user/userWithdrawalOK";
	}

}
