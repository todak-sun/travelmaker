package com.travelmaker.route.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.travelmaker.route.domain.RouteContentDTO;
import com.travelmaker.route.domain.RouteDTO;
import com.travelmaker.route.domain.RouteImageDTO;

@Repository("routeDAO")
@Transactional
public class RouteDAOMybatis implements RouteDAO {

	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public int setRoute(RouteDTO routeDTO) {
		sqlSession.insert("routeSQL.setRoute",routeDTO);
		return sqlSession.selectOne("routeSQL.getCurrRnoSeq");
	}

	@Override
	public int saveCourse(RouteContentDTO routeContentDTO) {
		sqlSession.insert("routeSQL.saveCourse",routeContentDTO);
		return sqlSession.selectOne("routeSQL.getCurrCrnoSeq");
	}

	@Override
	public void saveRoute(RouteDTO routeDTO) {
		sqlSession.update("routeSQL.saveRoute",routeDTO);
	}

	@Override
	public void saveRouteImage(RouteImageDTO routeImageDTO) {
		sqlSession.insert("routeSQL.saveRouteImage",routeImageDTO);
	}
	
}
