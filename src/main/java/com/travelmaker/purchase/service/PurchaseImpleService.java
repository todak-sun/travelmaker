package com.travelmaker.purchase.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelmaker.purchase.dao.PurchaseDAO;
import com.travelmaker.purchase.domain.PurchaseDTO;
import com.travelmaker.purchase.domain.PurchaseRequestDTO;

@Service
public class PurchaseImpleService implements PurchaseService {

	@Autowired
	private PurchaseDAO purchaseDAO;

	@Override
	public List<PurchaseDTO> getList(Map<String, Integer> map) {

		System.out.println(map.get("startNum"));
		System.out.println(map.get("endNum"));

		return purchaseDAO.getList(map);
	}

	@Override
	public int getTotalA() {
		return purchaseDAO.getTotal();
	}

	@Override
	public int purchaseWrite(PurchaseDTO purchaseDTO) {
		return purchaseDAO.purchaseRequestWrite(purchaseDTO);
	}

	@Override
	public PurchaseDTO getPurchaseDTO(String bno) {
		return purchaseDAO.getPurchaseDTO(bno);
	}

	@Override
	public void puchaseDelete(String bno) {
		purchaseDAO.puchaseDelete(bno);
	}

	@Override
	public void updatePurchase1(PurchaseDTO purchaseDTO) {
		purchaseDAO.updatePurchase1(purchaseDTO);
	}

	@Override
	public void updatePurchase2(PurchaseDTO purchaseDTO) {
		purchaseDAO.updatePurchase2(purchaseDTO);
	}

	

	
	
}

