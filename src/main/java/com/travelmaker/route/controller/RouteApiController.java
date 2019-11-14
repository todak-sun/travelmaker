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

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/route")
public class RouteApiController {

    @Autowired
    RouteService routeService;

    @PostMapping(path = "/showWriteForm", produces = "application/json; charset=UTF-8")
    public Map<String, Object> createWriteForm(@RequestBody RouteDTO routeDTO) {
        System.out.println(routeDTO.getTitle());
        int rno = routeService.setRoute(routeDTO);
        Map<String, Object> map = new HashMap<>();
        map.put("rno", rno);
        return map;
    }

    @PostMapping(path = "/saveCourse", produces = "application/json; charset=UTF-8")
    public Map<String, Object> saveCourse(Model model, @ModelAttribute RouteContentDTO routeContentDTO) {

        RouteImageDTO routeImageDTO = new RouteImageDTO();

        int crno = routeService.saveCourse(routeContentDTO); //저장한 코스의 crno 반환

        String filePath = "C:\\spring\\workSTS\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\travelmaker\\storage"; // 이미지저장경로

        int i = 1; // 이미지 순서
        for (MultipartFile img : routeContentDTO.getImages()) {
            String fileName = img.getOriginalFilename();
            File file = new File(filePath, fileName);

//         System.out.println(filePath);
//         System.out.println(fileName);

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
        return map;
    }

    @PostMapping(path = "/saveRoute", produces = "application/json; charset=UTF-8")
    public Map<String, Object> saveRoute(Model model, @ModelAttribute RouteDTO routeDTO) {
        Map<String, Object> map = new HashMap<String, Object>();
        routeService.saveRoute(routeDTO);
        return map;
    }

}