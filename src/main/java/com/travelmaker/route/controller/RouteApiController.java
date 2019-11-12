package com.travelmaker.route.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.travelmaker.route.domain.RouteContentDTO;
import com.travelmaker.route.domain.RouteDTO;
import com.travelmaker.route.domain.RouteImageDTO;
import com.travelmaker.route.service.RouteService;

@RestController
@RequestMapping(value = "/api/route")
public class RouteApiController {

	@Autowired
	RouteService routeService;

	@RequestMapping(value = "/showWriteForm")
	public Map<String, Object> createWriteForm(Model model, @ModelAttribute RouteDTO routeDTO) {
		int rno = routeService.setRoute(routeDTO);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("rno", rno);
		return map;
	}

	@RequestMapping(value = "/saveCourse", method = RequestMethod.POST)
	public Map<String, Object> saveCourse(Model model, @ModelAttribute RouteContentDTO routeContentDTO) {
		
		RouteImageDTO routeImageDTO = new RouteImageDTO();
		
		int crno = routeService.saveCourse(routeContentDTO); //저장한 코스의 crno 반환
		
		String filePath = "C:\\spring\\workSTS\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\travelmaker\\storage"; // 이미지저장경로

		int i = 1; // 이미지 순서
		for(MultipartFile img : routeContentDTO.getImages()) {
			String fileName = img.getOriginalFilename();
			File file = new File(filePath, fileName);
			
			System.out.println(filePath);
			System.out.println(fileName);
			
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
	
	@RequestMapping(value = "/saveRoute", method = RequestMethod.POST)
	public Map<String, Object> saveRoute(Model model, @ModelAttribute RouteDTO routeDTO){
		
		Map<String, Object> map = new HashMap<String, Object>();
		routeService.saveRoute(routeDTO);
		// ajax로 리턴해서 자바스크립트에서 양식 뿌려주기
		return map;
	}

}
