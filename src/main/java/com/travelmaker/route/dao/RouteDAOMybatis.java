package com.travelmaker.route.dao;

import java.util.ArrayList;
import java.util.List;

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
	

    @Override
    public RouteDTO getRoute(int rno) {
        return sqlSession.selectOne("routeSQL.getRoute", rno);
    }

    @Override
    public List<RouteContentDTO> getRouteContentStory(int rno) {

        List<RouteContentDTO> list = sqlSession.selectList("routeSQL.getRouteContentStory", rno);

        for (RouteContentDTO routeContentDTO : list) {
            List<String> imgs = new ArrayList<String>();
            List<RouteImageDTO> imageList = sqlSession.selectList("routeSQL.getRouteImageStory", routeContentDTO.getCrno());
            for (RouteImageDTO routeImageDTO : imageList) {
                imgs.add(routeImageDTO.getImg());
                System.out.println("img = " + imgs);
            }
            routeContentDTO.setImgs(imgs);
        }
        return list;
    }
	
}
