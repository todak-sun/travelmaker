package com.travelmaker.story.service;

import com.travelmaker.route.domain.RouteContentDTO;
import com.travelmaker.route.domain.RouteDTO;
import com.travelmaker.story.domain.StoryDTO;

import java.util.List;
import java.util.Map;

<<<<<<< HEAD
=======
import com.travelmaker.route.domain.RouteContentDTO;
import com.travelmaker.route.domain.RouteDTO;
import com.travelmaker.story.domain.StoryDTO;

>>>>>>> 586671ae114d8b2a9c3d6a1660afc4ea93908b98
public interface StoryService {

	public List<StoryDTO> getStory(Map<String, String> map);

	public String selectBoard(int bno);
	public RouteDTO getRoute(String bno);

	public List<RouteContentDTO> getRouteContentStory(int rno);

<<<<<<< HEAD
}
=======
}
>>>>>>> 586671ae114d8b2a9c3d6a1660afc4ea93908b98
