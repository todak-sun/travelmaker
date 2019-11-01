package com.travelmaker.route.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelmaker.route.dao.RouteDAO;
import com.travelmaker.route.domain.RouteContentDTO;
import com.travelmaker.route.domain.RouteDTO;

@Service(value = "routeService")
public class RouteServiceImpl implements RouteService {
	
	@Autowired
	RouteDAO routeDAO;
	
	@Override
	public void setRouteStep1(RouteDTO routeDTO) {
		
		routeDAO.setRouteStep1(routeDTO);
	}

	@Override
	public void saveCourse(RouteContentDTO routeContentDTO) {
		
		routeDAO.saveCourse(routeContentDTO);
	}
	
}
