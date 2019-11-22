package com.travelmaker.route.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
		if(routeDTO.getHashtag()==null) routeDTO.setHashtag("");
		routeDAO.saveRoute(routeDTO);
	}

	@Override
	public void saveRouteImage(RouteImageDTO routeImageDTO) {
		
		routeDAO.saveRouteImage(routeImageDTO);
	}

    @Override
    public RouteDTO getRoute(int rno) {
        return routeDAO.getRoute(rno);
    }

    @Override
    public List<RouteContentDTO> getRouteContentStory(int rno) {
        System.out.println("서비스 들어옴");
        return routeDAO.getRouteContentStory(rno);
    }

	@Override
	public RouteContentDTO getCourse(int crno) {
		return routeDAO.getCourse(crno);
	}

	@Override
	public void patchCourse(RouteContentDTO routeContentDTO) {
		routeDAO.patchCourse(routeContentDTO);
	}

	@Override
	public void deleteCourse(int crno) {
		routeDAO.deleteCourse(crno);
	}

	@Override
	public void saveOrder(int[] order) {
		Map<String, Integer> map = new HashMap<String, Integer>();
		for(int i = 0; i < order.length; i++) {
			map.put("cntOrder", i+1);
			map.put("crno", order[i]);
			routeDAO.saveOrder(map);
		}
		
	}
	
}
