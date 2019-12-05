package com.travelmaker.purchase.service;

import com.travelmaker.purchase.domain.PurchaseOrderDTO;
import com.travelmaker.purchase.domain.PurchaseRequestDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PurchaseRequestService {

	public List<PurchaseRequestDTO> getPurchaseRequest(String bno);

	public void setRequestWrite(PurchaseRequestDTO purchaseRquestDTO);

	public void setOrderWrite(PurchaseOrderDTO purchaseOrderDTO);

	public List<PurchaseOrderDTO> getPurchaseOrder(String bno);

	public void purchaseRequestDelete(String bno);

	public void purchaseOrderDelete(String bno);

	public ResponseEntity<String> purchaseOrderSetPermit(PurchaseOrderDTO purchaseOrderDTO);

	public ResponseEntity<String> purchaseRequestSetPermit(PurchaseRequestDTO purchaseRequestDTO);

}
