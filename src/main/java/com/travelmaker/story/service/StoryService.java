package com.travelmaker.story.service;

import java.util.List;
import java.util.Map;

import com.travelmaker.story.domain.StoryDTO;

public interface StoryService {

	public List<StoryDTO> getStory(Map<String, String> map);

	public String selectBoard(int bno);

}
