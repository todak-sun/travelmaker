package com.travelmaker.purchase.service;

import java.util.List;
import java.util.Map;

import com.travelmaker.purchase.domain.PurchaseDTO;
import com.travelmaker.purchase.domain.PurchaseRequestDTO;

public interface PurchaseService {

	public List<PurchaseDTO> getList(Map<String, Integer> map);

	public int getTotalA();

	public int purchaseWrite(PurchaseDTO purchaseDTO);

	public PurchaseDTO getPurchaseDTO(String bno);

	public void puchaseDelete(String bno);

	public void updatePurchase1(PurchaseDTO purchaseDTO);

	public void updatePurchase2(PurchaseDTO purchaseDTO);


}
