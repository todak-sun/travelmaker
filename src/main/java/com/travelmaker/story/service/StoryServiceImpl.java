package com.travelmaker.story.service;

import com.travelmaker.route.domain.RouteContentDTO;
import com.travelmaker.route.domain.RouteDTO;
import com.travelmaker.story.dao.StoryDAO;
import com.travelmaker.story.domain.StoryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service(value = "storyService")
public class StoryServiceImpl implements StoryService {

    @Autowired
    StoryDAO storyDAO;

    @Override
    public List<StoryDTO> getStory(Map<String, String> map) {
        return storyDAO.getStory(map);
    }

    @Override
    public String selectBoard(int bno) {


        return storyDAO.selectBoard(bno);
    }

    @Override
    public RouteDTO getRoute(String bno) {
        return storyDAO.getRoute(bno);
    }

    @Override
    public List<RouteContentDTO> getRouteContentStory(int rno) {
        System.out.println("서비스 들어옴");
        return storyDAO.getRouteContentStory(rno);
    }

    ;


}