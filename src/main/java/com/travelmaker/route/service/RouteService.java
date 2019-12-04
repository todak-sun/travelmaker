package com.travelmaker.route.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.travelmaker.route.domain.RouteContentDTO;
import com.travelmaker.route.domain.RouteDTO;
import com.travelmaker.route.domain.RouteImageDTO;

import java.util.List;

public interface RouteService {

	public int setRoute(RouteDTO routeDTO, MultipartFile image);

	public int saveCourse(RouteContentDTO routeContentDTO);

	public void saveRoute(RouteDTO routeDTO);

//	public void saveRouteImage(RouteImageDTO routeImageDTO);

    public RouteDTO getRoute(int rno);

    public List<RouteContentDTO> getRouteContentStory(int rno);

	public RouteContentDTO getCourse(int crno);

	public void patchCourse(RouteContentDTO routeContentDTO);

	public void deleteCourse(int crno);

	public void saveOrder(int[] order);

	public void updateViews(int rno);
	
	public List<RouteDTO> getRouteListByUserSeq(int seq);

	public int getRouteTemp(int seq);

	public void deleteRoute(int rno);

	public List<RouteDTO> getRouteListByUserSeq(int seq);

}
