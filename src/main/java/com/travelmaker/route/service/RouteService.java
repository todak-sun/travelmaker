package com.travelmaker.route.service;

import com.travelmaker.route.domain.RouteContentDTO;
import com.travelmaker.route.domain.RouteDTO;

public interface RouteService {

	public int setRoute(RouteDTO routeDTO);

	public void saveCourse(RouteContentDTO routeContentDTO);

	public void saveRoute(RouteDTO routeDTO);

}
