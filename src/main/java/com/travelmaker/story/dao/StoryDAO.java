package com.travelmaker.story.dao;

import com.travelmaker.friend.domain.FriendDTO;
import com.travelmaker.purchase.domain.PurchaseDTO;
import com.travelmaker.story.domain.StoryDTO;
import com.travelmaker.story.domain.StorySearchFilter;

import java.util.List;
import java.util.Map;

public interface StoryDAO {

    public List<StoryDTO> getStory(StorySearchFilter storySearchFilter);

//    public List<StoryDTO> getKeywordStory(StorySearchFilter storySearchFilter);

    public String selectBoard(int bno);

	public List<Map<String, String>> getFriends(StorySearchFilter storySearchFilter);

	public List<Map<String, String>> getPurchase(StorySearchFilter storySearchFilter);

}