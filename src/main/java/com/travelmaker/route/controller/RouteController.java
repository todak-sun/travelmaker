package com.travelmaker.route.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.travelmaker.route.domain.RouteContentDTO;
import com.travelmaker.route.domain.RouteDTO;
import com.travelmaker.route.domain.RouteImageDTO;
import com.travelmaker.route.service.RouteService;

@RequestMapping(value = "/route")
@Controller
public class RouteController {

	@Autowired
	RouteService routeService;

	@RequestMapping(value = "routeList")
	public String routeList(Model model) {
		// dto 리스트를 서버DB에서 가져오기
		return "/route/routeList";
	}

	@RequestMapping(value = "write")
	public String routeWirteForm(Model model, @RequestParam int isDomestic) {
		model.addAttribute("isDomestic", isDomestic);
		// dto를 서버DB에 저장
		return "/route/routeWriteForm";
	}

	@RequestMapping(value = "showWriteForm")
	@ResponseBody
	public Map<String, Object> createWriteForm(Model model, @ModelAttribute RouteDTO routeDTO) {
//		routeDTO.setIsDomestic(isDomestic);
		int rno = routeService.setRoute(routeDTO);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("rno", rno);
		// ajax로 리턴해서 자바스크립트에서 양식 뿌려주기
		return map;
	}

	@RequestMapping(value = "saveCourse", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveCourse(Model model, @ModelAttribute RouteContentDTO routeContentDTO) {
		
		RouteImageDTO routeImageDTO = new RouteImageDTO();
		
		int crno = routeService.saveCourse(routeContentDTO); //저장한 코스의 crno 반환
		
		String filePath = "C:\\FinalProject\\travelmaker\\src\\main\\webapp\\storage"; // 이미지저장경로

		int i = 1; // 이미지 순서
		for(MultipartFile img : routeContentDTO.getImages()) {
			String fileName = img.getOriginalFilename();
			File file = new File(filePath, fileName);
			
			try {
				FileCopyUtils.copy(img.getInputStream(), new FileOutputStream(file));
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			routeImageDTO.setImgOrder(i);
			routeImageDTO.setImg(fileName);
			routeImageDTO.setCrno(crno);
			i++;
			routeService.saveRouteImage(routeImageDTO);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("crno", crno);
		// ajax로 리턴해서 자바스크립트에서 양식 뿌려주기
		return map;
	}
	
	@RequestMapping(value = "saveRoute", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveRoute(Model model, @ModelAttribute RouteDTO routeDTO){
//			, @RequestParam MultipartFile images) {
//		System.out.println(images.getSize());
		System.out.println(routeDTO.getHashtag());
		Map<String, Object> map = new HashMap<String, Object>();
		routeService.saveRoute(routeDTO);
		// ajax로 리턴해서 자바스크립트에서 양식 뿌려주기
		return map;
	}

}
