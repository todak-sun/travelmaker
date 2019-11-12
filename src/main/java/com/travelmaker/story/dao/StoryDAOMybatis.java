package com.travelmaker.story.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.travelmaker.story.domain.StoryDTO;

@Repository("storyDAO")
@Transactional
public class StoryDAOMybatis implements StoryDAO {

	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<StoryDTO> getStory(Map<String, String> map) {
			
		return sqlSession.selectList("storySQL.getList",map);
	}

	@Override
	public String selectBoard(int bno) {
		return sqlSession.selectOne("storySQL.selectEssay",bno)==null?"route":"essay";
	}
	
}
