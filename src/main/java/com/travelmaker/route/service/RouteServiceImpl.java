package com.travelmaker.route.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelmaker.route.dao.RouteDAO;
import com.travelmaker.route.domain.RouteContentDTO;
import com.travelmaker.route.domain.RouteDTO;
import com.travelmaker.route.domain.RouteImageDTO;

@Service(value = "routeService")
public class RouteServiceImpl implements RouteService {
	
	@Autowired
	RouteDAO routeDAO;
	
	@Override
	public int setRoute(RouteDTO routeDTO) {
		
		return routeDAO.setRoute(routeDTO);
	}

	@Override
	public int saveCourse(RouteContentDTO routeContentDTO) {
		
		return routeDAO.saveCourse(routeContentDTO);
	}

	@Override
	public void saveRoute(RouteDTO routeDTO) {

		routeDAO.saveRoute(routeDTO);
	}

	@Override
	public void saveRouteImage(RouteImageDTO routeImageDTO) {
		
		routeDAO.saveRouteImage(routeImageDTO);
	}
	
}
