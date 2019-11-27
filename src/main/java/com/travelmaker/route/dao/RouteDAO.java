package com.travelmaker.route.dao;

import java.util.List;

import com.travelmaker.route.domain.RouteContentDTO;
import com.travelmaker.route.domain.RouteDTO;
import com.travelmaker.route.domain.RouteImageDTO;

public interface RouteDAO {

	public int setRoute(RouteDTO routeDTO);

	public int saveCourse(RouteContentDTO routeContentDTO);

	public void saveRoute(RouteDTO routeDTO);

	public void saveRouteImage(RouteImageDTO routeImageDTO);

    public RouteDTO getRoute(int rno);

    public List<RouteContentDTO> getRouteContentStory(int rno);


}
