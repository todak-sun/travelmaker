package com.travelmaker.purchase.service;

import com.travelmaker.cash.dao.CashDAO;
import com.travelmaker.purchase.dao.PurchaseRequestDAO;
import com.travelmaker.purchase.domain.PurchaseOrderDTO;
import com.travelmaker.purchase.domain.PurchaseRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service(value = "purchaseRequestService")
public class PurchaseRequestImplService implements PurchaseRequestService {

    @Autowired
    private PurchaseRequestDAO purchaseRequestDAO;

    @Autowired
    private CashDAO cashDAO;

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
    public ResponseEntity<String> purchaseOrderSetPermit(PurchaseOrderDTO purchaseOrderDTO) {
        if (purchaseOrderDTO.getIsPermit() == 2) { //거절인 경우
            return Optional.ofNullable(cashDAO.readOne(purchaseOrderDTO.getPrno()))
                    .map(cashDTO -> {
                        if (cashDTO.getRequestUserCheck() == 0 && cashDTO.getSellerCheck() == 0) {
                            cashDAO.delete(cashDTO.getCno());
                            purchaseRequestDAO.purchaseOrderSetPermit(purchaseOrderDTO);
                            return new ResponseEntity<>("OK_DELETE", HttpStatus.OK);
                        } else {
                            return new ResponseEntity<>("FAIL", HttpStatus.OK);
                        }
                    })
                    .orElseGet(() -> {
                        purchaseRequestDAO.purchaseOrderSetPermit(purchaseOrderDTO);
                        return new ResponseEntity<>("OK_PERMIT", HttpStatus.OK);
                    });
        } else { //수락인 경우
            purchaseRequestDAO.purchaseOrderSetPermit(purchaseOrderDTO);
            return new ResponseEntity<>("OK_PERMIT", HttpStatus.OK);
        }
    }

    @Override
    public ResponseEntity<String> purchaseRequestSetPermit(PurchaseRequestDTO purchaseRequestDTO) {
        if (purchaseRequestDTO.getIsPermit() == 2) {
            return Optional.ofNullable(cashDAO.readOne(purchaseRequestDTO.getPrno()))
                    .map(cashDTO -> {
                        if (cashDTO.getRequestUserCheck() == 0 && cashDTO.getSellerCheck() == 0) {
                            cashDAO.delete(cashDTO.getCno());
                            purchaseRequestDAO.purchaseRequestSetPermit(purchaseRequestDTO);
                            return new ResponseEntity<>("OK_DELETE", HttpStatus.OK);
                        } else {
                            return new ResponseEntity<>("FAIL", HttpStatus.OK);
                        }
                    }).orElseGet(() -> {
                        purchaseRequestDAO.purchaseRequestSetPermit(purchaseRequestDTO);
                        return new ResponseEntity<>("OK_PERMIT", HttpStatus.OK);
                    });
        } else {
            purchaseRequestDAO.purchaseRequestSetPermit(purchaseRequestDTO);
            return new ResponseEntity<>("OK_PERMIT", HttpStatus.OK);
        }


    }


}
