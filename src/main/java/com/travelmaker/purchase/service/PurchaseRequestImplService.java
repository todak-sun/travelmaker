package com.travelmaker.purchase.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelmaker.purchase.dao.PurchaseRequestDAO;
import com.travelmaker.purchase.domain.PurchaseOrderDTO;
import com.travelmaker.purchase.domain.PurchaseRequestDTO;

@Service(value="purchaseRequestService")
public class PurchaseRequestImplService implements PurchaseRequestService {

	@Autowired
	private PurchaseRequestDAO purchaseRequestDAO;
	
	@Override
	public List<PurchaseRequestDTO> getPurchaseRequest(String bno) {
		return purchaseRequestDAO.getPurchaseRequest(bno);
	}

	@Override
	public void setRequestWrite(PurchaseRequestDTO purchaseRquestDTO) {
		purchaseRequestDAO.setRequestWrite(purchaseRquestDTO);
	}

	@Override
	public void setOrderWrite(PurchaseOrderDTO purchaseOrderDTO) {
		purchaseRequestDAO.setOrderWrite(purchaseOrderDTO);
	}

	@Override
	public List<PurchaseOrderDTO> getPurchaseOrder(String bno) {
		return purchaseRequestDAO.getPurchaseOrder(bno);
	}

	@Override
	public void purchaseRequestDelete(String bno) {
		purchaseRequestDAO.purchaseRequestDelete(bno);
	}

	@Override
	public void purchaseOrderDelete(String bno) {
		purchaseRequestDAO.purchaseOrderDelete(bno);
	}

	@Override
	public void purchaseOrderSetPermit(PurchaseOrderDTO purchaseOrderDTO) {
		purchaseRequestDAO.purchaseOrderSetPermit(purchaseOrderDTO);
	}

	@Override
	public void purchaseRequestSetPermit(PurchaseRequestDTO purchaseRequestDTO) {
		purchaseRequestDAO.purchaseRequestSetPermit(purchaseRequestDTO);
	}
	
	
	
	
	
	
}
