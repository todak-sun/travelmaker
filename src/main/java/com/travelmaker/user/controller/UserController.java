package com.travelmaker.user.controller;

import com.travelmaker.user.domain.UserDTO;
import com.travelmaker.user.service.PwdGenerate;
import com.travelmaker.user.service.UserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.inject.Inject;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Controller
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    @Inject
    PasswordEncoder passwordEncoder;

    @Autowired
    UserServiceImpl userServiceImpl;

    @Inject
    JavaMailSender mailSender; // 메일 서비스를 사용하기 위해 의존성을 주입함.
//	MembershipService memberservice; // 서비스를 호출하기 위해 의존성을 주입

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

    /* 닉네임 체크 */
    @RequestMapping(value = "user/checkNickname", method = RequestMethod.GET)
    @ResponseBody
    public String checkNickname(@RequestParam String nickname) {

        UserDTO userDTO = userServiceImpl.checkNickname(nickname);
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

            if (passwordEncoder.matches(pwd, userDTO.getPassword())) {
                return "exist";
            } else {
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

    //회원가입 이메일 인증
    @RequestMapping(value = "/user/emailCode", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> emailCode(HttpServletRequest request, @RequestParam String email1, @RequestParam String email2, HttpServletResponse response_email) {

        System.out.println(email1 + "" + email2);

        Random r = new Random();
        int emailCode = r.nextInt(9000) + 1000; // 이메일로 받는 인증코드 부분 (난수)

        String setfrom = "qoatn94@gmail.com";
        String title = "비트맨 회원가입 인증 이메일 입니다."; // 제목
        String content =
                System.getProperty("line.separator") + // 한줄씩 줄간격을 두기위해 작성

                        System.getProperty("line.separator") +

                        "스페셜 게스트 디제이 오마이킹갓뱀수 ~ ~ "

                        + "봄날에 찾아온 봄제이 ~ ~"

                        + System.getProperty("line.separator") +

                        System.getProperty("line.separator") +

                        " 인증번호는 " + emailCode + " 입니다. "

                        + System.getProperty("line.separator") +

                        System.getProperty("line.separator") +

                        "오마에와 모 신데이루 !!! 나니니니이이이이!!! 감사합니다"; // 내용

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");

            messageHelper.setFrom(setfrom); // 보내는사람 생략하면 정상작동을 안함
            messageHelper.setTo(email1 + "@" + email2); // 받는사람 이메일
            messageHelper.setSubject(title); // 메일제목은 생략이 가능하다
            messageHelper.setText(content); // 메일 내용

            mailSender.send(message);

        } catch (Exception e) {
            System.out.println(e + "이 에러맞나?");
            e.printStackTrace();
        }

        Map<String, String> map = new HashMap<String, String>();
        map.put("emailCode", emailCode + "");
        System.out.println("map : " + map.get("emailCode"));


        return map;
    }

    @RequestMapping(value = "/user/userIdFind", method = RequestMethod.POST)
    @ResponseBody
    public List<String> userIdFind(@RequestParam String realname, @RequestParam String email1, @RequestParam String email2) throws IOException {
        return userServiceImpl.userIdFind(realname, email1, email2);
    }

	// 임시 비밀번호
	@RequestMapping(value = "/user/userPwFind", method = RequestMethod.POST)
	@ResponseBody
	public String userPwFind(@RequestParam String id, @RequestParam String email1,@RequestParam String email2) throws IOException {
		// @RequestParam String id, @RequestParam String email1,@RequestParam String
		// email2
		UserDTO userDTO = userServiceImpl.userPwFind(id, email1, email2); // 디비에 있는지 없는지 확인
		System.out.println("DTO 있니?"+ userDTO);
		if (userDTO != null) {// 디비에 있으면 실행

			StringBuffer sb = new StringBuffer();
			String newPwd = PwdGenerate.excuteGenerate(); // 이메일로 받는 인증코드 부분 (난수)

			userDTO.setPassword(passwordEncoder.encode(newPwd));
			System.out.println(userDTO.toString());
			String setfrom = "qoatn94@gmail.com";
			String title = "임시번호를 발급합니다."; // 제목
			String content = System.getProperty("line.separator") + System.getProperty("line.separator") + "임시 비밀번호는 "
					+ newPwd + "입니다!!";

			try {
				MimeMessage message = mailSender.createMimeMessage();
				MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");

				messageHelper.setFrom(setfrom); // 보내는사람 생략하면 정상작동을 안함
				messageHelper.setTo(userDTO.getEmail1() + "@" + userDTO.getEmail2()); // 받는사람 이메일
				messageHelper.setSubject(title); // 메일제목은 생략이 가능하다
				messageHelper.setText(content); // 메일 내용

				mailSender.send(message);

			} catch (Exception e) {
				System.out.println(e);
			}

			userServiceImpl.setPassword(userDTO);

			return newPwd;
		} else {
			return "";
		}

	}

}
