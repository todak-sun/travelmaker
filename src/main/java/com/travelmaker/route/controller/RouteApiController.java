package com.travelmaker.route.controller;

import com.travelmaker.route.domain.RouteContentDTO;
import com.travelmaker.route.domain.RouteDTO;
import com.travelmaker.route.domain.RouteImageDTO;
import com.travelmaker.route.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
// /api/route/{rno}/content/{crno}
// /api/route/{rno}/content/{crno}

@RestController
@RequestMapping(value = "/api/route")
public class RouteApiController {

	@Autowired
	ServletContext servletContext;
	
	@Autowired
	RouteService routeService;

	@RequestMapping(value = "/showWriteForm")
	public Map<String, Object> createWriteForm(Model model, @RequestBody RouteDTO routeDTO) {

		int rno = routeService.setRoute(routeDTO);
		System.out.println("rno값 생성 : "+rno);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("rno", rno);
		return map;
	}

	@PostMapping(value = "/Course")
	public Map<String, Object> saveCourse(Model model, @ModelAttribute RouteContentDTO routeContentDTO) {
		
		RouteImageDTO routeImageDTO = new RouteImageDTO();
		String filePath = servletContext.getRealPath("/resources/storage/route");
		int crno = routeService.saveCourse(routeContentDTO); //저장한 코스의 crno 반환
		System.out.println("getImages : " + routeContentDTO.getImages());
		if(routeContentDTO.getImages()!=null) { // 이미지가 있을 때
			int i = 1; // 이미지 순서
			for(MultipartFile img : routeContentDTO.getImages()) {
				String fileName = img.getOriginalFilename();
				File file = new File(filePath, fileName);
				
				System.out.println("파일 경로 : " + filePath);
				System.out.println("파일 이름 : " + fileName);
				
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
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("crno", crno);
		// ajax로 리턴해서 자바스크립트에서 양식 뿌려주기
		return map;
	}
	
	@PostMapping(value = "/Course-Modify")
	public Map<String, Object> patchCourse(Model model, @ModelAttribute RouteContentDTO routeContentDTO) {
		
		RouteImageDTO routeImageDTO = new RouteImageDTO();
		String filePath = servletContext.getRealPath("/resources/storage/route");
		//여기서부터 다시
		int crno = routeContentDTO.getCrno();
//		System.out.println(crno);
		System.out.println("getContent : "+routeContentDTO.getContent());
		routeService.patchCourse(routeContentDTO); //저장한 코스의 crno 반환
//		System.out.println(routeContentDTO.getImages());
		if(routeContentDTO.getImages()!=null) { // 이미지가 있을 때
			int i = 1; // 이미지 순서
			for(MultipartFile img : routeContentDTO.getImages()) {
				String fileName = img.getOriginalFilename();
				File file = new File(filePath, fileName);
				
				System.out.println("파일 경로 : " + filePath);
				System.out.println("파일 이름 : " + fileName);
				
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
		}
		
		// 이미지가 없을 때 이미지 다 지우는 DB문 추가
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("crno", crno);
		// ajax로 리턴해서 자바스크립트에서 양식 뿌려주기
		return map;
	}
	
	@DeleteMapping(value = "/Course/{crno}")
	public void deleteCourse(@PathVariable int crno) {
		routeService.deleteCourse(crno);
	}
	
	@GetMapping(value = "/Course/{crno}")
	public RouteContentDTO getCourse(@PathVariable int crno) {

		RouteContentDTO routeContentDTO = routeService.getCourse(crno);
		return routeContentDTO;
	}
	
	@PatchMapping(value = "/saveOrder")
	public void saveOrder(@RequestBody int[] order) {
		routeService.saveOrder(order);
	}
	
	@PostMapping(value = "/saveRoute")
	public Map<String, Object> saveRoute(Model model, @RequestBody RouteDTO routeDTO){

		Map<String, Object> map = new HashMap<String, Object>();
		routeService.saveRoute(routeDTO);
		// ajax로 리턴해서 자바스크립트에서 양식 뿌려주기
		return map;
	}
	
    @RequestMapping(value = "/getRoute", method = RequestMethod.GET)
    public RouteDTO getRouteView(@RequestParam int rno) {
    	
        System.out.println("rno = " + rno);
        RouteDTO routeDTO = routeService.getRoute(rno);
        System.out.println(routeDTO.getBno());

        return routeDTO;
    }
    
//    @RequestMapping(value = "/getRouteView/{rno}", method = RequestMethod.GET)
//    public List<RouteContentDTO> getRoutePreview(@PathVariable int rno) {
//    	System.out.println("getRouteView rno 값 : "+rno);
//    	
//    	List<RouteContentDTO> list = routeService.getRouteContentStory(rno);
//    	
//    	System.out.println("리스트 = " + list.size());
//    	System.out.println("image 총사이즈 : " + list.get(0).getImgs().size());
//    	
//    	return list;
//    }
    
    @RequestMapping(value = "/updateRouteLikes", method = RequestMethod.GET)
    public void updateRouteLikes(@RequestParam int rno, @RequestParam int seq) {
    	System.out.println("추가예정");
//    	routeService.updateRoutesLikes(rno, seq);
    	
//    	System.out.println("리스트 = " + list.size());
//    	System.out.println("image 총사이즈 : " + list.get(0).getImgs().size());
    	
//    	return list;
    }

    @GetMapping(value="/seq/{seq}")
	public List<RouteDTO> getRouteListByUserSeq(@PathVariable int seq){
		return routeService.getRouteListByUserSeq(seq);
	}

}
