package com.travelmaker.story.dao;

import com.travelmaker.story.domain.StoryDTO;
import com.travelmaker.story.domain.StorySearchFilter;

import java.util.List;

public interface StoryDAO {

    public List<StoryDTO> getStory(StorySearchFilter storySearchFilter);

<<<<<<< Updated upstream
//    public List<StoryDTO> getKeywordStory(StorySearchFilter storySearchFilter);
=======
    public List<StoryDTO> getKeywordStory(StorySearchFilter storySearchFilter);
>>>>>>> Stashed changes

    public String selectBoard(int bno);

}