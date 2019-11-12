package com.travelmaker.story.service;

import java.util.List;
import java.util.Map;

import com.travelmaker.route.domain.RouteContentDTO;
import com.travelmaker.route.domain.RouteDTO;
import com.travelmaker.story.domain.StoryDTO;

public interface StoryService {

	public List<StoryDTO> getStory(Map<String, String> map);

	public RouteDTO getRoute(String bno);

	public List<RouteContentDTO> getRouteContentStory(int rno);

}
