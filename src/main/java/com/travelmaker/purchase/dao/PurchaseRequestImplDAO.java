package com.travelmaker.purchase.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.travelmaker.purchase.domain.PurchaseOrderDTO;
import com.travelmaker.purchase.domain.PurchaseRequestDTO;

@Repository
public class PurchaseRequestImplDAO implements PurchaseRequestDAO {

	@Autowired
	private SqlSession sqlSession;
	
	
	@Override
	public List<PurchaseRequestDTO> getPurchaseRequest(String bno) {
		return sqlSession.selectList("purchaseSQL.getPurchaseRequest", Integer.parseInt(bno));
	}

	@Override
	public void setRequestWrite(PurchaseRequestDTO purchaseRquestDTO) {
		sqlSession.insert("purchaseSQL.setRequestWrite",purchaseRquestDTO);
	}

	@Override
	public void setOrderWrite(PurchaseOrderDTO purchaseOrderDTO) {
		sqlSession.insert("purchaseSQL.setOrderWrite",purchaseOrderDTO);
	}

	@Override
	public List<PurchaseOrderDTO> getPurchaseOrder(String bno) {
		return sqlSession.selectList("purchaseSQL.getPurchaseOrder", Integer.parseInt(bno));
	}

	@Override
	public void purchaseRequestDelete(String bno) {
		sqlSession.delete("purchaseSQL.purchaseRequestDelete",Integer.parseInt(bno));
	}

	@Override
	public void purchaseOrderDelete(String bno) {
		sqlSession.delete("purchaseSQL.purchaseOrderDelete",Integer.parseInt(bno));		
	}

	@Override
	public void purchaseOrderSetPermit(PurchaseOrderDTO purchaseOrderDTO) {
		sqlSession.update("purchaseSQL.purchaseOrderSetPermit", purchaseOrderDTO);
	}

	@Override
	public void purchaseRequestSetPermit(PurchaseRequestDTO purchaseRequestDTO) {
		sqlSession.update("purchaseSQL.purchaseRequestSetPermit",purchaseRequestDTO);
	}
	
	
	
	
	
	
}
