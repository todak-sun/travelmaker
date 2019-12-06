package com.travelmaker.purchase.controller;

import com.travelmaker.alarm.service.AlarmService;
import com.travelmaker.purchase.domain.PurchaseDTO;
import com.travelmaker.purchase.domain.PurchaseOrderDTO;
import com.travelmaker.purchase.domain.PurchasePaging;
import com.travelmaker.purchase.domain.PurchaseRequestDTO;
import com.travelmaker.purchase.service.PurchaseRequestService;
import com.travelmaker.purchase.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("pur")
public class PurchaseApiController {

    @Autowired
    private PurchaseService purchaseService;

    @Autowired
    private PurchasePaging purchasePaging;

    @Autowired
    private PurchaseRequestService purchaseRequestService;

    @Autowired
    private AlarmService alarmService;

    @GetMapping(path = "/getList", produces = "application/json")
    public ModelAndView getList(@RequestParam(required = false, defaultValue = "1") String pg) {
        ModelAndView modelAndView = new ModelAndView();
        System.out.println("pg" + pg);

        int endNum = Integer.parseInt(pg) * 5;
        int startNum = endNum - 4;

        Map<String, Integer> map = new HashMap<String, Integer>();

        map.put("startNum", startNum);
        map.put("endNum", endNum);

        List<PurchaseDTO> list = purchaseService.getList(map);

        int totalA = purchaseService.getTotalA();

        purchasePaging.setCurrentPage(Integer.parseInt(pg));
        purchasePaging.setPageBlock(3);
        purchasePaging.setPageSize(5);
        purchasePaging.setTotalA(totalA);
        purchasePaging.makePagingHTML();

        modelAndView.addObject("list", list);
        modelAndView.addObject("purchasePaging", purchasePaging);
        modelAndView.setViewName("jsonView");

        return modelAndView;

    }

    @PostMapping(value = "/setWriteRequest")
    public ModelAndView setWrite(@ModelAttribute PurchaseDTO purchaseDTO) {
        ModelAndView mav = new ModelAndView();
        System.out.println("뭐지?" + purchaseDTO.getCon());
        int result = purchaseService.purchaseWrite(purchaseDTO);

        if (result > 0) {
            mav.addObject("response", 1);
        } else {
            mav.addObject("response", 0);
        }
        mav.setViewName("/purchase/pageGo");
        return mav;
    }

    @PostMapping(value = "setRequestWrite")
    public void setRequestWrite(@ModelAttribute PurchaseRequestDTO purchaseRquestDTO) {
        purchaseRequestService.setRequestWrite(purchaseRquestDTO);
    }

    @GetMapping(value = "getRequestView")
    public ResponseEntity<List<PurchaseRequestDTO>> getRequestView(@RequestParam String bno) {
        List<PurchaseRequestDTO> list = purchaseRequestService.getPurchaseRequest(bno);

        if (list == null) {
            return new ResponseEntity<List<PurchaseRequestDTO>>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<List<PurchaseRequestDTO>>(list, HttpStatus.OK);
    }

    @PostMapping(value = "setOrderWrite")
    public void setOrderWrite(@ModelAttribute PurchaseOrderDTO purchaseOrderDTO) {
        purchaseRequestService.setOrderWrite(purchaseOrderDTO);
    }

    @GetMapping(value = "getOrderView")
    public ResponseEntity<List<PurchaseOrderDTO>> getOrderView(@RequestParam String bno) {

        List<PurchaseOrderDTO> list = purchaseRequestService.getPurchaseOrder(bno);

        if (list == null) {
            return new ResponseEntity<List<PurchaseOrderDTO>>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<List<PurchaseOrderDTO>>(list, HttpStatus.OK);
    }


    @DeleteMapping(value = "/deletePurchaseR/{bno}") //사다주세요 삭제
    public ResponseEntity<String> deletePurchase(@PathVariable String bno) {
        String responseMessage = null;
        purchaseService.puchaseDelete(bno); //원글삭제
        purchaseRequestService.purchaseRequestDelete(bno); //신청글 삭제
        alarmService.alarmDelete(bno); //해당글에대한 알람 제거
        return new ResponseEntity<String>(responseMessage, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deletePurchaseO/{bno}") //사다줄께요 삭제
    public ResponseEntity<String> deletePurchaseO(@PathVariable String bno) {
        String responseMessage = null;
        purchaseService.puchaseDelete(bno); //원글삭제
        purchaseRequestService.purchaseOrderDelete(bno); //신청글 삭제
        alarmService.alarmDelete(bno); //해당글에대한 알람 제거
        return new ResponseEntity<String>(responseMessage, HttpStatus.OK);
    }

    @PostMapping(value = "/setmodify")
    public ResponseEntity<String> updatePurchase(@ModelAttribute PurchaseDTO purchaseDTO) {
        String responseMessage = null;

        System.out.println(purchaseDTO.toString());

        if (purchaseDTO.getCon() == 1) {
            purchaseService.updatePurchase1(purchaseDTO);
        } else if (purchaseDTO.getCon() == 2) {
            purchaseService.updatePurchase2(purchaseDTO);
        } else {
            System.out.println("ERROR");
        }

        return new ResponseEntity<String>(responseMessage, HttpStatus.OK);
    }

    @PutMapping(value = "setOrderPermit", produces = "application/json; charset=UTF-8")
    public ResponseEntity<String> updateRequestPermit(@RequestBody PurchaseOrderDTO PurchaseOrderDTO) {
        System.out.println(PurchaseOrderDTO.toString());
        return purchaseRequestService.purchaseOrderSetPermit(PurchaseOrderDTO);
    }

    @PutMapping(value = "setRequestPermit", produces = "application/json; charset=UTF-8")
    public ResponseEntity<String> setRequestPermit(@RequestBody PurchaseRequestDTO purchaseRequestDTO) {
        System.out.println(purchaseRequestDTO.toString());
        return purchaseRequestService.purchaseRequestSetPermit(purchaseRequestDTO);
    }

}
