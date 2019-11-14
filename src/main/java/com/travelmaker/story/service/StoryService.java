package com.travelmaker.story.service;

import com.travelmaker.route.domain.RouteContentDTO;
import com.travelmaker.route.domain.RouteDTO;
import com.travelmaker.story.domain.StoryDTO;

import java.util.List;
import java.util.Map;

public interface StoryService {

	public List<StoryDTO> getStory(Map<String, String> map);

	public String selectBoard(int bno);
	public RouteDTO getRoute(String bno);

	public List<RouteContentDTO> getRouteContentStory(int rno);

}