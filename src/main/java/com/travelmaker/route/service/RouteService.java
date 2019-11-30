package com.travelmaker.route.service;

import com.travelmaker.route.domain.RouteContentDTO;
import com.travelmaker.route.domain.RouteDTO;
import com.travelmaker.route.domain.RouteImageDTO;

import java.util.List;

public interface RouteService {

	public int setRoute(RouteDTO routeDTO);

	public int saveCourse(RouteContentDTO routeContentDTO);

	public void saveRoute(RouteDTO routeDTO);

	public void saveRouteImage(RouteImageDTO routeImageDTO);

    public RouteDTO getRoute(int rno);

    public List<RouteContentDTO> getRouteContentStory(int rno);

	public RouteContentDTO getCourse(int crno);

	public void patchCourse(RouteContentDTO routeContentDTO);

	public void deleteCourse(int crno);

	public void saveOrder(int[] order);

	public void updateViews(int rno);

	public List<RouteDTO> getRouteListByUserSeq(int seq);

}
