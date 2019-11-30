package com.travelmaker.purchase.dao;

import java.util.List;
import java.util.Map;

import com.travelmaker.purchase.domain.PurchaseDTO;
import com.travelmaker.purchase.domain.PurchaseRequestDTO;


public interface PurchaseDAO {

	public List<PurchaseDTO> getList(Map<String, Integer> map);

	public int getTotal();

	public int purchaseRequestWrite(PurchaseDTO purchaseDTO);

	public PurchaseDTO getPurchaseDTO(String bno);

	public void puchaseDelete(String bno);

	public void updatePurchase1(PurchaseDTO purchaseDTO);

	public void updatePurchase2(PurchaseDTO purchaseDTO);


}
