package com.travelmaker.route.dao;

import java.util.List;
<<<<<<< Updated upstream
import java.util.Map;
=======
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
	public RouteContentDTO getCourse(int crno);

	public void patchCourse(RouteContentDTO routeContentDTO);

	public void deleteCourse(int crno);

	public void saveOrder(Map<String, Integer> map);

	public void updateViews(int rno);

=======
>>>>>>> Stashed changes

}
