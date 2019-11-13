package com.travelmaker.etcboard.controller;

import com.travelmaker.etcboard.domain.request.InquiryApiRequest;
import com.travelmaker.etcboard.domain.response.InquiryApiResponse;
import com.travelmaker.etcboard.ifs.InquiryApiInterface;
import com.travelmaker.etcboard.service.InquiryApiService;
import com.travelmaker.model.network.Header;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inquiry")
public class InquiryApiController implements InquiryApiInterface<InquiryApiRequest, InquiryApiResponse> {

    @Autowired
    private InquiryApiService inquiryApiService;

    @Override
    @GetMapping("/{iqno}")
    public Header<InquiryApiResponse> readOne(@PathVariable int iqno) {
        return inquiryApiService.readOne(iqno);
    }

    @Override
    @GetMapping("")
    public Header<List<InquiryApiResponse>> readAll() {
        return inquiryApiService.readAll();
    }

    @Override
    @PostMapping("")
    public Header<InquiryApiResponse> create(@RequestBody Header<InquiryApiRequest> request) {
        return inquiryApiService.create(request);
    }

    @Override
    @PutMapping("")
    public Header<InquiryApiResponse> update(@RequestBody Header<InquiryApiRequest> request) {
        return inquiryApiService.update(request);
    }

    @Override
    @DeleteMapping("/{iqno}")
    public Header delete(@PathVariable int iqno) {
        return inquiryApiService.delete(iqno);
    }
}
