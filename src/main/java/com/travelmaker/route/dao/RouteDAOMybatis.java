package com.travelmaker.route.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
		System.out.println("셋루트로 들어옴");
		sqlSession.insert("routeSQL.setRoute",routeDTO);
		return sqlSession.selectOne("routeSQL.getCurrRnoSeq");
	}
	
	@Override
	public int modifySetRoute(RouteDTO routeDTO) {
		System.out.println("모디파이셋루트로 들어옴");
		sqlSession.update("routeSQL.modifySetRoute",routeDTO);
		return routeDTO.getRno();
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
	public RouteDTO getRouteByBno(int bno) {
		return sqlSession.selectOne("routeSQL.getRouteByBno", bno);
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

	@Override
	public List<RouteDTO> getRouteListByUserSeq(int seq) {
		return sqlSession.selectList("routeSQL.getRouteListByUserSeq", seq);
	}
    
	@Override
	public RouteContentDTO getCourse(int crno) {
		
        List<String> imgs = new ArrayList<String>();
        List<RouteImageDTO> imageList = sqlSession.selectList("routeSQL.getRouteImageStory", crno);
        for (RouteImageDTO routeImageDTO : imageList) {
            imgs.add(routeImageDTO.getImg());
            System.out.println("img = " + imgs);
        }
        RouteContentDTO routeContentDTO = sqlSession.selectOne("routeSQL.getCourse",crno);
        routeContentDTO.setImgs(imgs);
        return routeContentDTO;
	}

	@Override
	public void patchCourse(RouteContentDTO routeContentDTO) {
		sqlSession.update("routeSQL.patchCourse",routeContentDTO);
	}

	@Override
	public void deleteCourse(int crno) {
		sqlSession.delete("routeSQL.deleteCourse",crno);
	}

	@Override
	public void saveOrder(Map<String, Integer> map) {
		sqlSession.update("routeSQL.saveOrder", map);		
	}

	@Override
	public void updateViews(int rno) {
		sqlSession.update("routeSQL.updateViews", rno);		
	}

	@Override
	public int getRouteTemp(int seq) {
		return sqlSession.selectOne("routeSQL.getRouteTemp", seq);
	}

	@Override
	public void deleteRoute(int rno) {
		sqlSession.delete("routeSQL.deleteRoute", rno);
	}

	@Override
	public void deleteRouteImage(String delImage) {
		sqlSession.delete("routeSQL.deleteRouteImage", delImage);
	}

	
}
