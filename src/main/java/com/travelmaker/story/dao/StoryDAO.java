package com.travelmaker.story.dao;

import java.util.List;
import java.util.Map;

import com.travelmaker.story.domain.StoryDTO;

public interface StoryDAO {

	public List<StoryDTO> getStory(Map<String, String> map);


}
