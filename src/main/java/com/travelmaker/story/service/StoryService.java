package com.travelmaker.story.service;

import com.travelmaker.story.domain.StoryDTO;
import com.travelmaker.story.domain.StorySearchFilter;

import java.util.List;
import java.util.Map;


public interface StoryService {

    public List<StoryDTO> getStory(StorySearchFilter storySearchFilter);
    
<<<<<<< Updated upstream
//    public List<StoryDTO> getKeywordStory(StorySearchFilter storySearchFilter);
=======
    public List<StoryDTO> getKeywordStory(StorySearchFilter storySearchFilter);
>>>>>>> Stashed changes

    public String selectBoard(int bno);

}
