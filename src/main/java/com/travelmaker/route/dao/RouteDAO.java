package com.travelmaker.route.dao;

import com.travelmaker.route.domain.RouteContentDTO;
import com.travelmaker.route.domain.RouteDTO;

public interface RouteDAO {

	public void setRouteStep1(RouteDTO routeDTO);

	public void saveCourse(RouteContentDTO routeContentDTO);

}
