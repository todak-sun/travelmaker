package com.travelmaker.story.dao;

import com.travelmaker.story.domain.StoryDTO;
import com.travelmaker.story.domain.StorySearchFilter;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository("storyDAO")
@Transactional
public class StoryDAOMybatis implements StoryDAO {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<StoryDTO> getStory(StorySearchFilter storySearchFilter) {
    	List<StoryDTO> list = sqlSession.selectList("storySQL.getList", storySearchFilter);
    	for(StoryDTO dto : list) {
    		System.out.println(dto.getRno() +" : " + dto.getCmt());
    	}
        return list;
    }
    
    @Override
    public List<StoryDTO> getKeywordStory(StorySearchFilter storySearchFilter) {
    	System.out.println("필터 키워드 : "+storySearchFilter.getKeyword());
    	return sqlSession.selectList("storySQL.getList", storySearchFilter);
    }

    @Override
    public String selectBoard(int bno) {

        return sqlSession.selectOne("storySQL.selectEssay", bno) == null ? "route" : "essay";
    }
}
