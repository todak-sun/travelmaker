package com.travelmaker.etcboard.controller;

import com.travelmaker.etcboard.domain.request.ReportApiRequest;
import com.travelmaker.etcboard.domain.response.ReportApiResponse;
import com.travelmaker.etcboard.ifs.ReportApiInterface;
import com.travelmaker.etcboard.service.ReportApiService;
import com.travelmaker.model.network.Header;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/report")
@Log
public class ReportApiController implements ReportApiInterface<ReportApiRequest, ReportApiResponse> {

    @Autowired
    ReportApiService reportApiService;

    @Override
    @GetMapping("")
    public Header<List<ReportApiResponse>> readAll() {
        return reportApiService.readAll();
    }

    @Override
    @GetMapping("/{reno}")
    public Header<ReportApiResponse> readOne(@PathVariable int reno) {
        return reportApiService.readOne(reno);
    }

    @Override
    @PostMapping("")
    public Header<ReportApiResponse> create(@RequestBody Header<ReportApiRequest> request) {
        return reportApiService.create(request);
    }

    @Override
    @PutMapping("")
    public Header<ReportApiResponse> update(@RequestBody Header<ReportApiRequest> request) {
        return reportApiService.update(request);
    }

    @Override
    @DeleteMapping("/{reno}")
    public Header delete(@PathVariable int reno) {
        return reportApiService.delete(reno);
    }
}
