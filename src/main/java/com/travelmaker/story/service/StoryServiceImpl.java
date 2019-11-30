package com.travelmaker.story.service;

import com.travelmaker.story.dao.StoryDAO;
import com.travelmaker.story.domain.StoryDTO;
import com.travelmaker.story.domain.StorySearchFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    
<<<<<<< Updated upstream
//    @Override
//    public List<StoryDTO> getKeywordStory(StorySearchFilter storySearchFilter) {
//    	return storyDAO.getKeywordStory(storySearchFilter);
//    }
  
=======
>>>>>>> Stashed changes
    @Override
    public List<StoryDTO> getKeywordStory(StorySearchFilter storySearchFilter) {
    	return storyDAO.getKeywordStory(storySearchFilter);
    }
<<<<<<< Updated upstream
=======
  
    @Override
    public String selectBoard(int bno) {
        return storyDAO.selectBoard(bno);
    }
>>>>>>> Stashed changes

}
