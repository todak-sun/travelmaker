package com.travelmaker.purchase.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.travelmaker.purchase.domain.PurchaseDTO;
import com.travelmaker.purchase.domain.PurchaseRequestDTO;

@Repository("purchaseDAO")
@Transactional
public class PurchaseImplDAO implements PurchaseDAO {

	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public List<PurchaseDTO> getList(Map<String, Integer> map) {
		return sqlSession.selectList("purchaseSQL.getList", map);
	}

	@Override
	public int getTotal() {
		return sqlSession.selectOne("purchaseSQL.getTotalA");
	}

	@Override
	public int purchaseRequestWrite(PurchaseDTO purchaseDTO) {
		return sqlSession.insert("purchaseSQL.purchaseRequestWrite",purchaseDTO);
	}

	@Override
	public PurchaseDTO getPurchaseDTO(String bno) {
		return sqlSession.selectOne("purchaseSQL.getPurchaseDTO", bno);
	}

	@Override
	public String puchaseDelete(String bno) {
		String imageName = sqlSession.selectOne("purchaseSQL.getDeleteImage", bno);
		sqlSession.delete("purchaseSQL.puchaseDelete", Integer.parseInt(bno));	
		
		return imageName;
	}

	@Override
	public void updatePurchase1(PurchaseDTO purchaseDTO) {
		sqlSession.update("purchaseSQL.updatePurchase1",purchaseDTO);
	}

	@Override
	public void updatePurchase2(PurchaseDTO purchaseDTO) {
		sqlSession.update("purchaseSQL.updatePurchase2",purchaseDTO);
	}

	
	
	

	
}
