package com.travelmaker.story.service;

import com.travelmaker.story.dao.StoryDAO;
import com.travelmaker.story.domain.StoryDTO;
import com.travelmaker.story.domain.StorySearchFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service(value = "storyService")
public class StoryServiceImpl implements StoryService {

    @Autowired
    StoryDAO storyDAO;

    @Override
    public List<StoryDTO> getStory(StorySearchFilter storySearchFilter) {
        return storyDAO.getStory(storySearchFilter);
    }
    
//    @Override
//    public List<StoryDTO> getKeywordStory(StorySearchFilter storySearchFilter) {
//    	return storyDAO.getKeywordStory(storySearchFilter);
//    }
  
    @Override
    public String selectBoard(int bno) {
        return storyDAO.selectBoard(bno);
    }

	@Override
	public Map<String, Object> getHomeList(String keyword) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		StorySearchFilter storySearchFilter = new StorySearchFilter();
		storySearchFilter.setStart(1);
		storySearchFilter.setEnd(4);
		storySearchFilter.setKeyword(keyword);
		map.put("story", storyDAO.getStory(storySearchFilter));
		map.put("friends", storyDAO.getFriends(storySearchFilter));
		map.put("purchase", storyDAO.getPurchase(storySearchFilter));
		
		return map;
	}

}
