package com.travelmaker.purchase.dao;

import java.util.List;

import com.travelmaker.purchase.domain.PurchaseOrderDTO;
import com.travelmaker.purchase.domain.PurchaseRequestDTO;

public interface PurchaseRequestDAO {

	public List<PurchaseRequestDTO> getPurchaseRequest(String bno);
	
	public void setRequestWrite(PurchaseRequestDTO purchaseRquestDTO);

	public void setOrderWrite(PurchaseOrderDTO purchaseOrderDTO);

	public List<PurchaseOrderDTO> getPurchaseOrder(String bno);

	public void purchaseRequestDelete(String bno);

	public void purchaseOrderDelete(String bno);

	public void purchaseOrderSetPermit(PurchaseOrderDTO purchaseOrderDTO);

	public void purchaseRequestSetPermit(PurchaseRequestDTO purchaseRequestDTO);
}
