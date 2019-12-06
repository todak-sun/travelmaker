package com.travelmaker.route.service;

import com.travelmaker.route.dao.RouteDAO;
import com.travelmaker.route.domain.RouteContentDTO;
import com.travelmaker.route.domain.RouteDTO;
import com.travelmaker.route.domain.RouteImageDTO;
import com.travelmaker.util.fileIO.FileIO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service(value = "routeService")
public class RouteServiceImpl implements RouteService {

    @Autowired
    ServletContext servletContext;

    @Autowired
    RouteDAO routeDAO;

    @Autowired
    FileIO fileIO;

    @Override
    public int setRoute(RouteDTO routeDTO, MultipartFile image) {

        // 서비스에서 rno 값 여부로 신규 or 수정 구분하여 rno 값 다시 반환
        System.out.println("rno 가져온 값 : " + routeDTO.getRno());
        System.out.println("기존 대표이미지 이름 : " + routeDTO.getImageName());
        String temp = "route";

        if (image != null) { // 대표 이미지 있으면 이미지 저장
            if (routeDTO.getImageName().equals("")) {
                String imageUrl = fileIO.saveImage(image, temp);
                routeDTO.setImageName(imageUrl);

            } else {
                String[] imageName = routeDTO.getImageName().split("/");
                fileIO.deleteImage(imageName[4], temp);
                String imageUrl = fileIO.saveImage(image, temp);
                routeDTO.setImageName(imageUrl);
            }
        }
        System.out.println("교체한 대표이미지 이름 : " + routeDTO.getImageName());
        return routeDTO.getRno() > 0 ? routeDAO.modifySetRoute(routeDTO) : routeDAO.setRoute(routeDTO);
    }

    @Override
    public int saveCourse(RouteContentDTO routeContentDTO) {

        int crno = routeDAO.saveCourse(routeContentDTO); // 저장한 코스의 crno 반환

        RouteImageDTO routeImageDTO = new RouteImageDTO();
        String temp = "route";
        // String filePath = servletContext.getRealPath("/resources/storage/route");
        // System.out.println("getImages : " + routeContentDTO.getImages());
        if (routeContentDTO.getImages() != null) { // 이미지가 있을 때
            int i = 1; // 이미지 순서
            for (MultipartFile img : routeContentDTO.getImages()) {
                String imageUrl = fileIO.saveImage(img, temp);
                // String fileName =
                // (LocalDateTime.now()+img.getOriginalFilename()).replace(":", "-");
                // File file = new File(filePath, fileName);
                //
                // System.out.println("파일 경로 : " + filePath);
                // System.out.println("파일 이름 : " + fileName);
                //
                // try {
                // FileCopyUtils.copy(img.getInputStream(), new FileOutputStream(file));
                // } catch (IOException e) {
                // e.printStackTrace();
                // }

                routeImageDTO.setImgOrder(i);
                routeImageDTO.setImg(imageUrl);
                routeImageDTO.setCrno(crno);
                i++;
                routeDAO.saveRouteImage(routeImageDTO);
            }
        }
        return crno;
    }

    @Override
    public void saveRoute(RouteDTO routeDTO) {
        if (routeDTO.getHashtag() == null)
            routeDTO.setHashtag("");
        routeDAO.saveRoute(routeDTO);
    }

    // @Override
    // public void saveRouteImage(RouteImageDTO routeImageDTO) {
    //
    // routeDAO.saveRouteImage(routeImageDTO);
    // }

    @Override
    public RouteDTO getRoute(int rno) {
        return routeDAO.getRoute(rno);
    }

    @Override
    public List<RouteContentDTO> getRouteContentStory(int rno) {
        return routeDAO.getRouteContentStory(rno);
    }

    @Override
    public RouteContentDTO getCourse(int crno) {
        return routeDAO.getCourse(crno);
    }

    @Override
    public void patchCourse(RouteContentDTO routeContentDTO) {

        // 코스정보 수정
        int crno = routeContentDTO.getCrno();
        System.out.println("[patch]getContent : " + routeContentDTO.getContent());
        // 삭제할 이미지가 있다면 삭제
        System.out.println("[patch]delImage 개수 : " + routeContentDTO.getDelImages().length);
        System.out.println("[patch]delImage 0번째 이름 : " + routeContentDTO.getDelImages()[0]);
        if (routeContentDTO.getDelImages() != null) {
            for (String delImage : routeContentDTO.getDelImages()) {
                String temp = "route";
                System.out.println("delImage 이름 : " + delImage);
                String[] imageName = delImage.split("/");
                fileIO.deleteImage(imageName[4], temp);
                routeDAO.deleteRouteImage(delImage);
            }
        }
        // 추가할 이미지가 있다면 저장
        if (routeContentDTO.getImages() != null) { // 이미지가 있을 때
            RouteImageDTO routeImageDTO = new RouteImageDTO();
            // String filePath = servletContext.getRealPath("/resources/storage/route");
            int i = 1; // 이미지 순서
            for (MultipartFile img : routeContentDTO.getImages()) {
                String temp = "route";
                String imageName = fileIO.saveImage(img, temp);
                // String fileName = img.getOriginalFilename();
                // File file = new File(filePath, fileName);
                //
                // System.out.println("파일 경로 : " + filePath);
                // System.out.println("파일 이름 : " + fileName);
                //
                // try {
                // FileCopyUtils.copy(img.getInputStream(), new FileOutputStream(file));
                // } catch (IOException e) {
                // e.printStackTrace();
                // }

                routeImageDTO.setImgOrder(i);
                routeImageDTO.setImg(imageName);
                routeImageDTO.setCrno(crno);
                i++;
                routeDAO.saveRouteImage(routeImageDTO);
            }
        }
        // 코스 정보 저장
        routeDAO.patchCourse(routeContentDTO);
    }

    @Override
    public void deleteCourse(int crno) {
        List<RouteImageDTO> list = routeDAO.deleteCourse(crno);
        String temp = "route";

        for (RouteImageDTO routeImageDTO : list) {
            String[] imageUrl = routeImageDTO.getImg().split("/");
            fileIO.deleteImage(imageUrl[4], temp);
        }
    }

    @Override
    public void saveOrder(int[] order) {
        Map<String, Integer> map = new HashMap<String, Integer>();
        for (int i = 0; i < order.length; i++) {
            map.put("cntOrder", i + 1);
            map.put("crno", order[i]);
            routeDAO.saveOrder(map);
        }
    }

    @Override
    public void updateViews(int rno) {
        routeDAO.updateViews(rno);
    }

    @Override
    public List<RouteDTO> getRouteListByUserSeq(int seq) {
        return routeDAO.getRouteListByUserSeq(seq);
    }

    @Override
    public int getRouteTemp(int seq) {
        return Optional.ofNullable(routeDAO.getRouteTemp(seq))
                .map(routeDTO -> routeDTO.getRno())
                .orElse(0);

    }

    @Override
    public void deleteRoute(int rno) {
        List<String> list = routeDAO.deleteRoute(rno);
        String temp = "route";

        for (String imageName : list) {
            String[] imageUrl = imageName.split("/");
            fileIO.deleteImage(imageUrl[4], temp);
        }
    }

}
