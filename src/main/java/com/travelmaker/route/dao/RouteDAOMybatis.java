package com.travelmaker.route.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.travelmaker.route.domain.RouteContentDTO;
import com.travelmaker.route.domain.RouteDTO;

@Repository("routeDAO")
@Transactional
public class RouteDAOMybatis implements RouteDAO {

	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public void setRouteStep1(RouteDTO routeDTO) {
		sqlSession.insert("routeSQL.setRouteStep1",routeDTO);
	}

	@Override
	public void saveCourse(RouteContentDTO routeContentDTO) {
		sqlSession.insert("routeSQL.saveCourse",routeContentDTO);
	}
	
}
